import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { Menu as MenuIcon, Settings as SettingsIcon } from "@mui/icons-material"  ;

const TopBar = ({ onMenuClick }) => {
    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>

                <IconButton edge="start" color="inherit" onClick={onMenuClick}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
                    Health Management System
                </Typography>

                <IconButton color="default">
                    <SettingsIcon />
                </IconButton>

                <Avatar sx={{ bgcolor: "primary.main", ml: 1 }}>A</Avatar>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
