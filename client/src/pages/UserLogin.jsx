import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLogin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        userLogin
      );
      console.log(res.data.token);
      navigate("/userdashboard");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="container w-25 my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            ref={emailRef}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            ref={passwordRef}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
        <p
          className="text-primary pointer text-decoration-underline"
          onClick={() => navigate("/userregistration")}
        >
          Don't you have an account?
        </p>
      </form>
    </div>
  );
}

export default UserLogin;
