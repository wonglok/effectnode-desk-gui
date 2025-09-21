import { OneMiniApp } from "./OneMiniApp";
import { useMiniApps } from "./useMiniApps";

export function MiniApps() {
    let apps = useMiniApps((r) => r.apps);

    return (
        <>
            {apps.map((app) => {
                return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
            })}
        </>
    );
}
