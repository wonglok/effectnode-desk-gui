import { OneMiniApp } from "./OneMiniApp";
import { useApps } from "./useMiniApps";

export function MiniApps() {
    let apps = useApps();

    return (
        <>
            {apps.map((app) => {
                return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
            })}
        </>
    );
}
