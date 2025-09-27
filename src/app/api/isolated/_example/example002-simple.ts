import ivm from "isolated-vm";
import { serverRoll } from "./serverRoll";

async function Yo() {
    let result;
    let isolate = new ivm.Isolate({ memoryLimit: 256 });
    let context = isolate.createContextSync();

    // let worker = new global.Worker(new URL("./app.worker.ts", import.meta.url));

    // worker.postMessage({ ok: 123 });
    // let extCopy = new ExternalCopy({ isolate, context, global });

    // Get a Reference{} to the global object within the context.
    const zone = context.global;

    // This makes the global object available in the context as `global`. We use `derefInto()` here
    // because otherwise `global` would actually be a Reference{} object in the new isolate.
    zone.setSync("global", zone.derefInto());

    result = await new Promise(async (resolve) => {
        // We will create a basic `log` function for the new isolate to use.
        zone.setSync("outputJSONResult", (args) => {
            resolve(args);
        });

        zone.setSync("getData", (args) => {
            return { ...args, pp: 12345 };
        });

        let codes = await serverRoll({
            files: [
                {
                    path: `/src/main.js`,
                    content: `
                    import { Schema } from 'mongoose';
                    
                    let yoyo = new Schema({
                        name: String,
                    });

                    console.log(yoyo);

                    let input = ${JSON.stringify({ ppap: 1234 })};

                    let data = getData(input);
                    input.data = data;

                    outputJSONResult(input);
                    
                    `,
                },
            ],
        });

        // Let's see what happens when we try to blow the isolate's memory
        const hostile = isolate.compileScriptSync(`
            ${codes[0]?.code}
        `);

        // Using the async version of `run` so that calls to `log` will get to the main node isolate
        hostile.run(context).catch((err) => console.error(err));
    });
    //
}
