import { Typography, Paper, Box } from "@mui/material";

const Message = ({user, item, index }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: item.sent_userId !== user ? "flex-start" : "flex-end",
        mb: 2,
      }}
      key={index}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor:
            item.sent_userId === user ? "primary.light" : "secondary.light",
          borderRadius:
            item.sent_userId !== user
              ? "20px 20px 20px 5px"
              : "20px 20px 5px 20px",
        }}
      >
        <Typography variant="body1">{item.message}</Typography>
      </Paper>
    </Box>
  );
};

export default Message;
