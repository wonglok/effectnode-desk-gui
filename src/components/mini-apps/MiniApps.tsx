import { OneMiniApp } from "./OneMiniApp";
import { Use } from "./useMiniApps";

export function MiniApps() {
    let apps = Use.apps;

    return (
        <>
            {apps.map((app) => {
                return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
            })}
        </>
    );
}
