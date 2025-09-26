import { Color } from "three";

let primary = new Color("#E96825");
let grid = new Color(primary).offsetHSL(0, 0.5, 0.0);
let background = new Color(primary).offsetHSL(0, 0.1, -0.4);

export const BrandColors = {
    primary,
    grid,
    background,
};
