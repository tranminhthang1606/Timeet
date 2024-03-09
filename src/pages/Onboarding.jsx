import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Onboarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    user_id: cookies.id || "",
    first_name: "",
    last_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender: "",
    show_gender: true,
    gender_interest: "",
    email: cookies.email || "",
    url: "",
    about: "",
    matches: [],
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/update/${cookies.id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      const success = response.status == 200;
      if (success) {
        navigate("/dashboard");
      } else {
        
      }
      console.log(response, success);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  useEffect(() => {
    if (!cookies.id || !cookies.email || !cookies.token) {
      navigate("/");
    }
  }, [cookies.id, cookies.email, cookies.token]);
  return (
    <>
      <Navbar minimal={false} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form method="post" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">Họ</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              required={true}
              onChange={handleChange}
              value={formData.first_name}
            />
            <label htmlFor="last_name">Tên</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              required={true}
              onChange={handleChange}
              value={formData.last_name}
            />
            <label htmlFor="dob">Ngày Sinh</label>
            <div className="multiple-input-container">
              <input
                type="number"
                name="dob_day"
                id="day"
                required={true}
                onChange={handleChange}
                value={formData.dob_day}
              />
              <input
                type="number"
                name="dob_month"
                id="month"
                required={true}
                onChange={handleChange}
                value={formData.dob_month}
              />
              <input
                type="number"
                name="dob_year"
                id="year"
                required={true}
                onChange={handleChange}
                value={formData.dob_year}
              />
            </div>
            <label htmlFor="gender">Giới Tính</label>
            <div className="multiple-input-container">
              <input
                id="Man_Gender"
                type="radio"
                name="gender"
                value="Nam"
                checked={formData.gender === "Nam"}
                onChange={handleChange}
              />
              <label htmlFor="Man_Gender">Nam</label>

              <input
                id="Women_Gender"
                type="radio"
                name="gender"
                value="Nữ"
                onChange={handleChange}
                checked={formData.gender === "Nữ"}
              />
              <label htmlFor="Women_Gender">Nữ</label>

              <input
                id="LGBT_Gender"
                type="radio"
                name="gender"
                value="LGBT"
                onChange={handleChange}
                checked={formData.gender === "LGBT"}
              />
              <label htmlFor="LGBT_Gender">LGBT</label>
            </div>

            <label htmlFor="show-gender">
              Hiện giới tính trên trang của tôi
            </label>
            <input
              type="checkbox"
              name="show_gender"
              checked={formData.show_gender}
              onChange={handleChange}
            />

            <label htmlFor="gender_interest">Hiển thị với tôi</label>
            <div className="multiple-input-container">
              <input
                id="Man_gender_interest"
                type="radio"
                name="gender_interest"
                value="Nam"
                onChange={handleChange}
                checked={formData.gender_interest === "Nam"}
              />
              <label htmlFor="Man_gender_interest">Nam</label>

              <input
                id="women_gender_interest"
                type="radio"
                name="gender_interest"
                value="Nữ"
                onChange={handleChange}
                checked={formData.gender_interest === "Nữ"}
              />
              <label htmlFor="women_gender_interest">Nữ</label>

              <input
                id="LGBT_gender_interest"
                type="radio"
                name="gender_interest"
                value="LGBT"
                onChange={handleChange}
                checked={formData.gender_interest === "LGBT"}
              />
              <label htmlFor="LGBT_gender_interest">LGBT</label>
            </div>

            <label htmlFor="about">Giới thiệu bản thân</label>
            <input name="about" id="" type="text" onChange={handleChange} />
            <input type="submit" value="Xác nhận" />
          </section>
          <section>
            <label htmlFor="">Hồ sơ</label>
            <input
              type="url"
              name="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
