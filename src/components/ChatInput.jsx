import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const ChatInput = ({ sent_user, receive_user, calling }) => {
  const [textarea, setTextArea] = useState();

  const newMessages = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/addMessages",
        {
          data: {
            sent_userId: sent_user,
            received_userId: receive_user,
            message: textarea,
          },
        }
      );
      setTextArea("");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    (
      <Box
        sx={{
          p: 2,
          backgroundColor: "background.default",
          borderRadius: "20px 20px 0px 0px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              placeholder="Type a message"
              onChange={(e) => setTextArea(e.target.value)}
              value={textarea}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={newMessages}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default ChatInput;
