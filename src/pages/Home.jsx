import { useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/Auth";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const authToken = false;
  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true);
  };
  return (
    <div className="home-container" >
      <Navbar
        minimal={true}
        authToken={authToken}
        setShowModal={setShowModal}
        setIsSignUp={setIsSignUp}
        showModal={showModal}
      />
      <div className="homepage">
        <h1 className="primary-title">Let's Match</h1>
        { !showModal &&
          <button className="primary-button" onClick={handleClick}>
            {authToken ? "Đăng xuất" : "Đăng ký tài khoản"}
          </button>
        }
      </div>

      {showModal && (
        <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
      )}
    </div>
  );
};

export default Home;
