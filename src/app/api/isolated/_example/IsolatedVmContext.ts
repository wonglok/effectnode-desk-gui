import ivm, { type Reference } from "isolated-vm";
import * as helper from "./http";

export class IsolatedVmContext {
    private readonly isolate: ivm.Isolate;
    private readonly context: ivm.Context;
    private readonly globals: Reference<Record<number | string | symbol, any>>;

    constructor(memoryLimit: number) {
        this.isolate = new ivm.Isolate({ memoryLimit });
        this.context = this.isolate.createContextSync();
        this.globals = this.context.global;
    }

    async initializeContext(): Promise<void> {
        await this.initCoreModules();
        await this.initHttpModules();
        await this.initDatabaseModule();
    }

    // Adds normal helper functions to the isolated context
    async initCoreModules(): Promise<void> {
        this.globals.setSync("global", this.globals.derefInto());

        this.globals.setSync("log", function (...args: any[]) {
            console.log(...args);
        });

        this.globals.setSync("btoa", function (str: string) {
            return btoa(str);
        });
    }

    // Adds async functions via evalClosure to enable network requests (and other functions as well!!)
    async initHttpModules(): Promise<void> {
        //
        await this.context.evalClosure(
            `
            (function() {
                http = {
                    sendGetRequest: function (...args) {
                        return $0.apply(undefined, args, { arguments: { copy: true }, result: { promise: true, copy: true } });
                    },
                    sendPostRequest: function (...args) {
                        return $1.apply(undefined, args, { arguments: { copy: true }, result: { promise: true, copy: true } });
                    }
                };
            })();
            `,
            [helper.sendGetRequest, helper.sendPostRequest],
            {
                arguments: { reference: true },
            },
        );
    }

    // Adds async functions via evalClosure to enable network requests (and other functions as well!!)
    async initDatabaseModule(): Promise<void> {
        //
        await this.context.evalClosure(
            `
            (function() {
                database = {
                    sendGetRequest: function (...args) {
                        return $0.apply(undefined, args, { arguments: { copy: true }, result: { promise: true, copy: true } });
                    },
                    sendPostRequest: function (...args) {
                        return $1.apply(undefined, args, { arguments: { copy: true }, result: { promise: true, copy: true } });
                    }
                };
            })();
            `,
            [helper.sendGetRequest, helper.sendPostRequest],
            {
                arguments: { reference: true },
            },
        );
    }

    // Executes user scripts within the isolated environment
    async compileAndExecuteFunction(
        userScript: string,
        args = {},
    ): Promise<any> {
        const script = await this.isolate.compileScript(userScript);
        await script.run(this.context);

        const executeFnReference = await this.context.global.get("execute", {
            reference: true,
        });

        if (executeFnReference.typeof === undefined) {
            throw new Error(
                "The function 'execute' could not be found. " +
                    "We couldn't find the requested function.",
            );
        }

        const result: any = await executeFnReference.apply(undefined, [args], {
            arguments: { copy: true },
            result: { promise: true, copy: true },
        });

        return result;
    }
}
