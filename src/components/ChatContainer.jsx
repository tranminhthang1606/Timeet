import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";

const ChatContainer = ({
  user,
  setShowChat,
  setClickedUser,
  darkMode,
  setDarkMode,
}) => {
  return (
    <div className="chat-container">
      <ChatHeader user={user} darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="option-container">
        <button className="option">Matches</button>
      </div>

      <MatchesDisplay
        userId={user.user_id}
        matches={user.matches}
        setClickedUser={setClickedUser}
        setShowChat={setShowChat}
        darkMode={darkMode}
      />
    </div>
  );
};

export default ChatContainer;
