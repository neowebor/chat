import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "..";
import { useAuth } from "../firebase";
import { LOGIN_ROUTE } from "../utils/consts";

const Navbar = () => {
  const isAuth = useAuth();
  const { auth } = useContext(Context);

  const logOut = async () => {
    signOut(auth);
  };

  return (
    <AppBar color={"default"} position="static">
      <Toolbar variant={"dense"}>
        <Grid container justifyContent={"flex-end"}>
          {isAuth ? (
            <Button onClick={logOut} color={"warning"}>
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button color={"warning"}>Логин</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
