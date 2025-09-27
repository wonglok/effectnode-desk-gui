import { Color } from "three";

let primary = new Color("#E9BD76").offsetHSL(0.35, 0.0, 0.0);
let grid = new Color(primary).offsetHSL(0, 0.5, -0.25);
let background = new Color(primary).offsetHSL(0, -0.05, 0.05);

export const BrandColors = {
    primary,
    grid,
    background,
};
