import { DEFAULT_THEME, ThemeFactory } from "@skbkontur/react-ui";

const themeOverrides = {
  btnBorderRadiusLarge: "6px",
  btnBorderRadiusMedium: "6px",
  btnBorderRadiusSmall: "6px",
  inputBorderRadiusSmall: "6px",
  inputBorderRadiusMedium: "6px",
  inputBorderRadiusLarge: "6px",
  hintBorderRadius: "4px",
};

export default ThemeFactory.create(themeOverrides, DEFAULT_THEME);
