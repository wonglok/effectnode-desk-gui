import { Color } from "three";

let primary = new Color("#FBB628").offsetHSL(0.0, 0.0, 0.0);
let grid = new Color(primary).offsetHSL(0, 0.2, -0.35);
let background = new Color(primary).offsetHSL(0, -0.05, 0.05);

export const BrandColors = {
    primary,
    grid,
    background,
};

//

//

//
