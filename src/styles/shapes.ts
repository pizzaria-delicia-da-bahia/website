import { colors } from "@styles/colors";

export const shapes = {
  background: /*css*/ `
  linear-gradient(135deg, ${colors.background} 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, ${colors.backgroundLight} 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, ${colors.background} 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, ${colors.background} 25%, ${colors.backgroundDark} 25%) 0px 0/ 20px 20px;
  `,
};
