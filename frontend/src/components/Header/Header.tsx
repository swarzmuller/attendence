import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" padding="26px">
          <Link to="/">Таблиця відвідувань учнів</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
