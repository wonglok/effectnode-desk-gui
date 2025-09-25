export const getDragToggleProps = ({ onClick = () => {} }) => {
    return {
        cursor: "pointer",
        onPointerDown: (ev: any) => {
            ev.eventObject.userData.movementTick = 0;
        },
        onPointerMove: (ev: any) => {
            if (typeof ev.eventObject.userData.movementTick === "number") {
                ev.eventObject.userData.movementTick += 1;
                ev.stopPropagation();
            }
        },
        onPointerUp: (ev: any) => {
            if (typeof ev.eventObject.userData.movementTick === "number") {
                if (ev.eventObject.userData.movementTick <= 5) {
                    onClick();
                    ev.eventObject.userData.movementTick = 0;
                }
                ev.eventObject.userData.movementTick = undefined;
            }
        },
    };
};
