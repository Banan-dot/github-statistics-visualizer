import { FLAT_THEME_8PX, ThemeFactory } from "@skbkontur/react-ui";

const themeOverrides = {
  btnBorderRadiusLarge: "6px",
  btnBorderRadiusMedium: "6px",
  btnBorderRadiusSmall: "6px",
  inputBorderRadiusSmall: "6px",
  inputBorderRadiusMedium: "6px",
  inputBorderRadiusLarge: "6px",
};

export default ThemeFactory.create(themeOverrides, FLAT_THEME_8PX);
