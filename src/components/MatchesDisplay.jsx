import axios from "axios";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";

const MatchesDisplay = ({
  userId,
  matches,
  setClickedUser,
  setShowChat,
  darkMode
}) => {
  const [matchesList, setMatchesList] = useState([]);
  const parse_matches = JSON.parse(matches);
  const list_matches_id =
    parse_matches && parse_matches.map((item) => item.user_id);

  const getMatchedUsers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/get-matched-list",
        { list_matches_id: list_matches_id, user_id: userId }
      );

      console.log(response.data);

      setMatchesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatchedUsers();
  }, [matches]);

  return (
    <div className={darkMode?'matches-display dark':'matches-display'}>
      {matchesList &&
        matchesList.map((item) => {
          return (
            <div
              className="single_user_display"
              key={item.user_id}
              onClick={() => {
                setClickedUser(item),
                  setShowChat(true)
              }}
            >
              <div className="img-container">
                <img src={item.url} alt="" />
              </div>
              <div className="username-and-chat">
                <p>{item.first_name + " " + item.last_name}</p>
                <p>last chat something ...</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MatchesDisplay;
