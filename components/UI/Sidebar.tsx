import { useContext } from "react";
import { UIContext } from "../../context/UI";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Box,
  ListItemText,
  Divider,
} from "@mui/material";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const items: string[] = ["Inbox", "Starred", "Send email", "Drafts"];

export function Siderbar() {
  const { sidebarOpen, closeSidebar } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sidebarOpen} onClose={closeSidebar}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {items.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {items.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
