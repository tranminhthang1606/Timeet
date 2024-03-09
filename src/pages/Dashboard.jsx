import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatDisplay from "../components/ChatDisplay";

const DashBoard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState(null);
  const [genderedUser, setGenderedUser] = useState(null);
  const userId = cookies.id;
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/${userId}`
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersByGender = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/interest-users/${user.gender_interest}`
      );
      console.log(response.data);
      setGenderedUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUsersByGender();
  }, [user]);

  useEffect(() => {
    if (!cookies.id || !cookies.email || !cookies.token) {
      navigate("/");
    }
  }, [cookies.id, cookies.email, cookies.token]);

  const navigate = useNavigate();
  const [lastDirection, setLastDirection] = useState();

  const updateUserMatches = async (userMatchId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/${userId}/matches`,
        {
          userMatchId: userMatchId,
        }
      );
      console.log(response);
    } catch (error) {}
  };
  const swiped = (direction, userId) => {
    if (direction === "right") {
      updateUserMatches(userId);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds =
    user && JSON.parse(user.matches).map(({ user_id }) => user_id);
  console.log(matchedUserIds);

  const filterGenderedUsers = genderedUser?.filter(
    (genderedUser) =>
      genderedUser.user_id != userId &&
      !matchedUserIds.includes(genderedUser.user_id)
  );

  if (user != null) {
    console.log(JSON.parse(user.matches));
  }

  const [showChat, setShowChat] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      {user && (
        <div className={darkMode?'dashboard dark':'dashboard'}>
          <ChatContainer
            user={user}
            setShowChat={setShowChat}
            setClickedUser={setClickedUser}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <div className={!showChat ? "swiper-container" : "boxchat-container"}>

            {!showChat && (
              <div className="card-container">
                {genderedUser &&
                  filterGenderedUsers.map((character) => (
                    <TinderCard
                      className="swipe"
                      key={character.first_name}
                      onSwipe={(dir) => swiped(dir, character.user_id)}
                      onCardLeftScreen={() => outOfFrame(character.first_name)}
                    >
                      <div
                        style={{
                          backgroundImage: "url(" + character.url + ")",
                        }}
                        className="card"
                      >
                        <h3>
                          {character.first_name + " " + character.last_name}
                        </h3>
                      </div>
                    </TinderCard>
                  ))}
                <div className="swipe-info">
                  {lastDirection && <p>Bạn đã quẹt {lastDirection}</p>}
                </div>
              </div>
            )}
            {clickedUser && (
              <ChatDisplay user={user.user_id} clickedUser={clickedUser} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
