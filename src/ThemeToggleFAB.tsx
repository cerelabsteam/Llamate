import "./stylesheets/ThemeToggleFAB.css";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

import type { PaletteOptions } from "@mui/material/styles";

function ThemeToggleFAB(props: {
  handleThemeToggle: () => void;
  currentThemePalette: PaletteOptions["mode"];
}) {
  const themeClass = props.currentThemePalette === "light" ? "light" : "dark";

  return (
    <IconButton
      onClick={props.handleThemeToggle}
      className={`ThemeToggleFAB ${themeClass}`}
    >
      {props.currentThemePalette === "light" ? (
        <DarkModeIcon />
      ) : (
        <LightModeIcon />
      )}
    </IconButton>
  );
}

export default ThemeToggleFAB;
