import { OneWindow } from "./OneWindow";
import {
    Use,
    useMiniApps,
    type AppObject,
    type WinObject,
} from "./useMiniApps";

export function OneMiniApp({ app }: { app: AppObject }) {
    let wins = Use.wins;

    return (
        <>
            {/*  */}
            {wins
                .filter((win: WinObject) => win.value.appID === app.key)
                .map((win: WinObject) => {
                    return <OneWindow key={win._id} win={win}></OneWindow>;
                })}
            {/*  */}
        </>
    );
}
