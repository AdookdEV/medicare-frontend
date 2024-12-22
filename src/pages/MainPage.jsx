import {Box} from "@mui/material";
import NavigationPanel from "../components/NavigationPanel.jsx";
import TopBar from "../components/TopBar.jsx";
import MainContent from "../components/MainContent.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {LOGIN_URL} from "../api/url.js";

const MainPage = () => {
    const [isNavOpen, setIsNavOpen] = useState(true); // Default state for navigation panel
    const navigate = useNavigate();


    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate(LOGIN_URL);
        }
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen); // Toggle navigation panel state
    };

    return (
        <Box sx={{display: "flex", height: "100vh"}}>
            {/* Navigation Panel */}
            {isNavOpen && (
                <Box
                    component="nav"
                    sx={{
                        width: 250,
                        flexShrink: 0,
                        backgroundColor: "#f5f5f5",
                        borderRight: "1px solid #ddd",
                    }}
                >
                    <NavigationPanel/>
                </Box>
            )}
            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    transition: "margin 0.3s",
                    ml: isNavOpen ? 0 : 0,
                }}
            >
                {/* Topbar with Menu Button */}
                <TopBar onMenuClick={toggleNav}/>
                <MainContent/>
            </Box>
        </Box>
    )
}

export default MainPage;