import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import db from "../firebase";
import "./App.css";
import Message from "./Message";
import firebase from "firebase/compat/app";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // useState = variable in React
  // useEffect = run code on a condition in React

  useEffect(() => {
    const convertTimestamp = (timestamp) => {
      const date = timestamp?.toDate()?.toLocaleDateString();
      const time = timestamp?.toDate()?.toLocaleTimeString();
      const timestampFormat = time + " - " + date;
      return timestampFormat;
    };

    // Get a list of messages from your database
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
            timestamp: convertTimestamp(doc.data().timestamp),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []); //condition

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  function getFormattedDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const str =
      year + "/" + month + "/" + day + " - " + hour + ":" + min + ":" + sec;
    return str;
  }

  const dateNow = getFormattedDate();

  return (
    <div className="App">
      <img
        src="https://scontent.ftpe8-2.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=DAvpWrur1msAX-yMjjJ&_nc_ht=scontent.ftpe8-2.fna&oh=00_AT8BDx17GpDjJ4GO5ix6F_dzRjIWY4J9QA8BzOiDkJlyjQ&oe=62A512BD"
        alt=""
      />
      <h1 style={{ marginTop: "20px" }}>Facebook Messenger App</h1>
      <br />
      <h2>Welcome {username}</h2>
      <br />
      <p style={{ color: "gray" }}>{dateNow}</p>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages?.map(({ id, message, timestamp }) => (
          <Message
            key={id}
            username={username}
            message={message}
            timestamp={timestamp}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
