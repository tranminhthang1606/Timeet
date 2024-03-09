import { useEffect, useState } from "react";
import VideoCall from "./VideoCall";
import Message from "./Messages";
import { Box } from "@mui/material";
import DuoOutlinedIcon from "@mui/icons-material/DuoOutlined";

const Chat = ({ messages, user, chatContainerRef, calling, setCalling }) => {
  
  return (
    <div className="chat-display" ref={chatContainerRef}>
      <div className="chat-header">
        <DuoOutlinedIcon
          sx={{ fontSize: 40 }}
          onClick={() => setCalling(!calling)}
        />
      </div>

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages &&
          messages.map((item, index) => {
            return <Message user={user} item={item} index={index} />;
          })}
      </Box>
      {calling == true && <VideoCall calling={calling} />}
    </div>
  );
};

export default Chat;
