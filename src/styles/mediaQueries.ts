import { breakpoints } from "./breakpoints";

const t = (min: String, max: String) =>
  `only screen and (min-width: ${min}) ${
    max ? `and (max-width: calc(${max} - 1px))` : ""
  }`;
export const breakpointsMQ = {
  mobile: t("0px", breakpoints.tablet),
  mobileUp: t("0px", null),
  tablet: t(breakpoints.tablet, breakpoints.desktop),
  tabletUp: t(breakpoints.tablet, null),
  desktop: t(breakpoints.desktop, breakpoints.desktopLg),
  desktopUp: t(breakpoints.desktop, null),
  desktopLg: t(breakpoints.desktopLg, breakpoints.tv),
  desktopLgUp: t(breakpoints.desktopLg, null),
  tv: t(breakpoints.tv, null),
};

export const hover = `@media (hover: hover) and (pointer: fine)`;
