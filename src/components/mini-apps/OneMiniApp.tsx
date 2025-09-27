import { OneWindow } from "./OneWindow";
import { useWins, type AppObject, type WinObject } from "./useMiniApps";

export function OneMiniApp({ app }: { app: AppObject }) {
    let wins = useWins();

    return (
        <>
            {/*  */}
            {wins
                .filter((r) => r.type === "wins")
                .filter((win: WinObject) => win.value.appID === app.key)
                .map((win: WinObject) => {
                    return <OneWindow key={win._id} win={win}></OneWindow>;
                })}
            {/*  */}
        </>
    );
}
