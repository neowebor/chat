import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { Context } from "..";

const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
  };

  return (
    <div>
      <Container>
        <Grid
          container
          style={{ height: window.innerHeight - 50 }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            style={{ width: 400, background: "lightgray" }}
            container
            alignItems={"center"}
            direction={"column"}
          >
            <Box p={5}>
              <Button onClick={login}>Войти с помощью Google</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
