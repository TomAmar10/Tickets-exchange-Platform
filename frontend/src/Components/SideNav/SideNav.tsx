import "./SideNav.scss";

import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../store/store";
import { eventActions } from "../../store/eventSlice";
import { randomProfile } from "../../utils/file-import";
import { Role } from "../../models/User";
import { userActions } from "../../store/authSlice";
import LangModel from "../../languageControl/Language";
import useAuthService from "../../services/authService";

const drawerWidth = 270;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface props {
  language: string;
  data: LangModel;
}

export default function SideNav(props: props) {
  const data = props.data.SideNav;
  const [open, setOpen] = React.useState(false);
  const authService = useAuthService();
  const navigate = useNavigate();
  const user = useSelector((state: IStore) => state.user.user);
  const isHebrew = props.language === "HEBREW";
  const dispatch = useDispatch();
  const backgroundColor = "#f8f8f8"; // $color4
  const textColor = "#2a0659"; // color1
  const boxShadow = "rgba(255, 255, 255, 0.35) 1.95px 1.95px 15px";
  const justifyContent = "space-between";

  const listItems = [
    {
      name: data.home,
      item: <HomeIcon />,
      click: () => navigate(`/`),
    },
    {
      name: data.tickets,
      item: <ConfirmationNumberIcon />,
      click: () => navigate(`profile/${user?._id}/tickets`),
    },
    {
      name: data.offers,
      item: <LocalOfferIcon />,
      click: () => navigate(`profile/${user?._id}/offers`),
    },
    {
      name: data.wallet,
      item: <AccountBalanceWalletIcon />,
      click: () => navigate(`profile/${user?._id}/wallet`),
    },
    {
      name: data.createEvent,
      item: <EventNoteIcon />,
      click: () => dispatch(eventActions.startCreating()),
    },
    { name: data.contact, item: <ContactSupportIcon /> },
  ];

  const bottomItems = [
    { name: data.settings, item: <SettingsIcon /> },
    {
      name: data.logout,
      item: <LogoutIcon />,
      click: () => authService.logout(),
    },
  ];

  if (user?.role === Role.ADMIN)
    listItems.unshift({
      name: data.admin,
      item: <AdminPanelSettingsIcon />,
      click: () => navigate("admin-page"),
    });
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className="drawer"
        anchor={isHebrew ? "right" : "left"}
        PaperProps={{
          sx: {
            boxShadow,
            backgroundColor,
            justifyContent,
          },
        }}
        variant="permanent"
        open={open}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
      >
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate(`profile/${user?._id}`)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open && !isHebrew ? 2.5 : "auto",
                  ml: open && isHebrew ? 2.5 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  className="sideNav-profile-img"
                  src={user?.image || randomProfile}
                  alt={user?.first_name}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  opacity: open ? 1 : 0,
                  color: textColor,
                  textAlign: isHebrew ? "right" : "left",
                }}
              >
                <div className="sideNav-profile-name-area">
                  <span className="sideNav-profile-name">
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="sideNav-profile-email">{user?.email}</span>
                </div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          {listItems.map((i) => (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              key={i.name}
              onClick={i.click}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open && !isHebrew ? 3 : "auto",
                    ml: open && isHebrew ? 3 : "auto",
                    justifyContent: "center",
                    color: textColor,
                  }}
                >
                  {i.item}
                </ListItemIcon>
                <ListItemText
                  primary={i.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: textColor,
                    textAlign: isHebrew ? "right" : "left",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {bottomItems.map((i) => (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              key={i.name}
              onClick={i.click}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open && !isHebrew ? 3 : "auto",
                    ml: open && isHebrew ? 3 : "auto",
                    justifyContent: "center",
                    color: textColor,
                  }}
                >
                  {i.item}
                </ListItemIcon>
                <ListItemText
                  primary={i.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: textColor,
                    textAlign: isHebrew ? "right" : "left",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
