import { useEffect, useState, useRef} from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";
import { Box } from "@mui/material";
const ChatDisplay = ({ user, clickedUser }) => {
  const clickedId = clickedUser?.user_id;
  const userId = user ?? user;
  const [messages, setMessages] = useState(null);
  const [updateRealTime, setUpdateRealTime] = useState(false);
  const [calling, setCalling] = useState(false);
  let allMessages = [];
  const chatContainerRef = useRef(null);
  const getUserMessages = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/get-messages",
        {
          userId: userId,
          clickedId: clickedId,
        }
      );
      const listMessages = [
        ...response.data.userMessages,
        ...response.data.clickedUserMessages,
      ].sort((a, b) => a.id - b.id);
      setMessages(listMessages);
      allMessages = listMessages;
    } catch (error) {
      console.log(error);
    }
  };
  // const descendingOrderMessages = messages?.sort((a, b) =>
  //   a.timestamp.localeCompare(b.timestamp)
  // );
  useEffect(() => {
    new Promise((resolve, reject) => {
      getUserMessages();
    });
  }, [updateRealTime, clickedUser, user]);
  useEffect(() => {
    window.Echo.channel(`chat`).listen("MessageSent", (e) => {
      setUpdateRealTime(!updateRealTime);
      allMessages.push(e.message);
      setMessages(allMessages);
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });
  }, [updateRealTime]);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent:"space-between" }}>
      <Chat
        messages={messages}
        user={user}
        chatContainerRef={chatContainerRef}
        calling={calling}
        setCalling={setCalling}
      />
      <ChatInput sent_user={user} receive_user={clickedId} calling={calling} />
    </Box>
  );
};

export default ChatDisplay;
