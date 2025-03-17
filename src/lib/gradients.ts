export type ColorString = string;

export interface GradientColorStopObject {
  0: number;
  1: ColorString;
  color?: Highcharts.Color;
}

export type GradientColor = Array<GradientColorStopObject>;

function generateLinearGradientStops(color: string): GradientColor {
  if (!color.startsWith('#') || color.length !== 7) {
    throw new Error('Invalid color');
  }
  return [
    [-0.2302, `${color}90`],
    [-0.1782, `${color}33`],
    [1, `${color}00`]
  ] as Array<GradientColorStopObject>;
}

export const Gradients = {
  linear: generateLinearGradientStops
};
