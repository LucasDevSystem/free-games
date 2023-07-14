import { Box, Drawer } from "@mui/material";

import { colors } from "../../global/colors";
import DrawerFilters from "./DrawerFilters";

const drawerWidth = 240;

const ResponsiveDrawer = ({
  container,
  mobileOpen,
  query,
  onChangeQuery,
  onDrawerToggle,
  genreOptions,
}: any) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            bgcolor: colors.background,
            width: drawerWidth,
          },
        }}
      >
        <DrawerFilters
          query={query}
          onChangeQuery={onChangeQuery}
          genreOptions={genreOptions}
        ></DrawerFilters>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            bgcolor: colors.background,
            width: drawerWidth,
            overflowX: "hidden",
            overflowY: "auto",
          },
        }}
        open
      >
        <DrawerFilters
          query={query}
          onChangeQuery={onChangeQuery}
          genreOptions={genreOptions}
        ></DrawerFilters>
      </Drawer>
    </Box>
  );
};

export default ResponsiveDrawer;
