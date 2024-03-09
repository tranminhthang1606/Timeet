import logo_color from "../images/logo2.png";
import { useCookies } from "react-cookie";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useState } from "react";
const ChatHeader = ({ user,darkMode,setDarkMode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const Logout = () => {
    removeCookie("email", cookies.email);
    removeCookie("id", cookies.id);
    removeCookie("token", cookies.token);
    window.location.reload();
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  
  return (
    <div className="chat-header">
      <div className="profile">
        <div className="img-container">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="avatar" src={user.url} />
          </StyledBadge>
        </div>
        <h3>{user.first_name + " " + user.last_name}</h3>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.primary",
            borderRadius: 1,
          }}
        >
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
          >
            {!darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </div>
      <i className="log-out-icon" onClick={Logout}>
        {" "}
        -- Out Chat
      </i>
    </div>
  );
};

export default ChatHeader;
