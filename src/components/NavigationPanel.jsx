import {Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Paper} from "@mui/material";
import {
  Checklist as ChecklistIcon,
  QueryStats as StatisticsIcon,
  MedicalServices as FirstAidIcon,
  Medication as PillIcon,
} from "@mui/icons-material";

import {
  STATISTICS_URL,
  TREATMENT_URL,
  TODAY_URL,
  SUPPORT_URL,
  KNOWLEDGE_URL
} from "../api/url.js";

import { Link, useLocation } from "react-router";


const NavigationPanel = () => {
  const location = useLocation();

  const isSelected = (path) => location.pathname === path;


  return (
      <Box
          sx={{
            width: 250,
            height: "100vh",
            backgroundColor: "#f5f5f5",
            p: 2,
          }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Dashboard
        </Typography>
        <Divider />
        <List>
          <ListItemButton component={Link} to={TODAY_URL} selected={isSelected(TODAY_URL)}>
            <ListItemIcon>
              <ChecklistIcon color={isSelected(TODAY_URL) ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Today's Medicine" />
          </ListItemButton>

          <ListItemButton component={Link} to={STATISTICS_URL} selected={isSelected(STATISTICS_URL)}>
            <ListItemIcon>
              <StatisticsIcon color={isSelected(STATISTICS_URL) ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItemButton>

          <ListItemButton component={Link} to={SUPPORT_URL} selected={isSelected(SUPPORT_URL)}>
            <ListItemIcon>
              <FirstAidIcon color={isSelected(SUPPORT_URL) ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>

          <ListItemButton component={Link} to={TREATMENT_URL} selected={isSelected(TREATMENT_URL)}>
            <ListItemIcon>
              <PillIcon color={isSelected(TREATMENT_URL) ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Treatment" />
          </ListItemButton>

          <ListItemButton component={Link} to={KNOWLEDGE_URL} selected={isSelected(KNOWLEDGE_URL)}>
            <ListItemIcon>
              <PillIcon color={isSelected(KNOWLEDGE_URL) ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Treatment" />
          </ListItemButton>
        </List>
      </Box>
  );
};

export default NavigationPanel;
