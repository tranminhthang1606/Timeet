import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const handleClick = () => {
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match");
      }

      const response = await axios.post(
        `http://localhost:8000/api/${isSignUp?'signup':'login'}`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      setCookie('email',response.data.user.email);
      setCookie("id", isSignUp?response.data.user.id:response.data.user.user_id);
      setCookie("token", response.data.token);
      const success = response.status == 201;
      if (success && isSignUp) {
        navigate("/onboarding");
      }
      if(success && !isSignUp){
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="authModal">
      <div className="close-icon" onClick={handleClick}>
        X
      </div>
      <h2>{isSignUp ? "Đăng Ký Tài Khoản" : "Đăng Nhập"}</h2>
      <p>
        Đăng nhập / Đăng ký đồng nghĩa với việc bạn đã đồng ý với điều khoản của
        chúng tôi.
      </p>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
      AUTH MODAL
    </div>
  );
};
export default AuthModal;
