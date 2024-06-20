import type { PaletteOptions } from "@mui/material/styles";

interface UIConfig {
  defaultThemePalette: PaletteOptions["mode"];
  lightThemePalette: PaletteOptions["mode"];
  darkThemePalette: PaletteOptions["mode"];
  snackbarCloseTimeInMS: number;
}

export default UIConfig;
