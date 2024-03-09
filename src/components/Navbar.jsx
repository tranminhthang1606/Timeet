import logo_color from "../images/logo2.png"
import logo_white from "../images/logo.png"
const Navbar = ({minimal,setShowModal,showModal,setIsSignUp}) => {
  
  const handleClick = ()=>{
    setShowModal(true)
    setIsSignUp(false);
  }

  const authToken = true;
  
  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src={!minimal ? logo_color : logo_white}
          alt=""
        />
        <span className="logo-name">Timeet</span>
      </div>
      {authToken && <button className="nav-button" onClick={handleClick} disabled={showModal}>Đăng nhập</button>}
    </nav>
  );
};

export default Navbar;
