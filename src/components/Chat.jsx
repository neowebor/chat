import { Button, Container, Grid, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { firestore, useAuth } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Chat = () => {
  const isAuth = useAuth();
  const [value, setValue] = useState("");
  const [messages] = useCollectionData(collection(firestore, "messages"));
  const [sorted, setSortedArr] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const sendMessage = async () => {
    const db = await addDoc(collection(firestore, "messages"), {
      uid: isAuth.uid,
      displayName: isAuth.displayName,
      photoURL: isAuth.photoURL,
      text: value,
      createdAt: serverTimestamp(),
    });
    const sort = messages
      ? messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      : null;
    setSortedArr(sort);
    setValue("");
  };

  return (
    <Container>
      <Grid
        justifyContent={"center"}
        container
        style={{ height: window.innerHeight - 50, marginTop: 20 }}
      >
        <div
          style={{
            width: "80%",
            height: "60%",
            border: "1px solid gray",
            overflowY: "auto",
          }}
        >
          {sorted
            ? sorted.map((data) => <div key={data.createdAt}>{data.text}</div>)
            : null}
        </div>
        <Grid
          container
          flexDirection={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            value={value}
            onChange={handleChange}
            fullWidth
            maxRows={2}
            variant={"outlined"}
          />
          <Button onClick={sendMessage}>Отправить</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
