import "./stylesheets/ThemeToggleFAB.css";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Fab } from "@mui/material";

import type { PaletteOptions } from "@mui/material/styles";
function ThemeToggleFAB(props: {
  handleThemeToggle: () => void;
  currentThemePalette: PaletteOptions["mode"];
}) {
  return (
    <Fab onClick={props.handleThemeToggle} className="ThemeToggleFAB">
      {props.currentThemePalette === "light" ? (
        <DarkModeIcon />
      ) : (
        <LightModeIcon />
      )}
    </Fab>
  );
}

export default ThemeToggleFAB;
