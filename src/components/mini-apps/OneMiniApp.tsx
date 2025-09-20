import { OneWindow } from "./OneWindow";
import { useMiniApps, type MiniAppType, type WindowType } from "./useMiniApps";

export function OneMiniApp({ app }: { app: MiniAppType }) {
    let wins = useMiniApps((r) => r.wins);

    return (
        <>
            {/*  */}
            {wins
                .filter((win) => win.appID === app._id)
                .map((win: WindowType) => {
                    return <OneWindow key={win._id} win={win}></OneWindow>;
                })}
            {/*  */}
        </>
    );
}
