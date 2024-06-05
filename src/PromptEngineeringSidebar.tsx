import "./stylesheets/PromptEngineeringSidebar.css";

import { Dispatch, SetStateAction } from "react";

import InboxIcon from "@mui/icons-material/Inbox";
import {
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function PromptEngineeringSidebar(props: {
  isPromptEngineeringSidebarOpen: boolean;
  changeIsPromptEngineeringSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Drawer
      open={props.isPromptEngineeringSidebarOpen}
      onClose={() => {
        props.changeIsPromptEngineeringSidebarOpen(false);
      }}
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
}

export default PromptEngineeringSidebar;
