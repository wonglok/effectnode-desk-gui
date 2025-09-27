import { IsolatedVmContext } from "./IsolatedVmContext";

export async function runExample(): Promise<void> {
    const isolatedContext = new IsolatedVmContext(256); // 256 MB memory limit
    await isolatedContext.initializeContext();

    const userScript = `
        async function execute({ authHeader, baseUrl }) {
            const url = baseUrl;

            log('URL', url);

            const result = await http.sendPostRequest(
                { Authorization: authHeader },
                url,
                {
                    fromIsolatedVM: "userScript"
                }
            );

            return result;
        }
    `;

    //
    //

    const result = await isolatedContext.compileAndExecuteFunction(userScript, {
        authHeader: "happy",
        baseUrl: "http://localhost:3000/api/isolated/tester",
    });

    console.log(result);

    return result;
}
