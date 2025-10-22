import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      address: addressRef.current.value,
    };
    try {
      const res = await axios.post("http://localhost:8080/api/user", userData);
      console.log(res.data);
      console.log(userData);
      
    } catch (err) {
      console.error("Kullanıcı kayıt hatası", err.message);
    }
  };

  return (
    <div>
      <form className="container w-25 my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            id="exampleInputName1"
            aria-describedby="nameHelp"
          />
        </div>
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
        <div className="form-floating">
          <textarea
            className="form-control"
            ref={addressRef}
            placeholder="Leave a comment here"
            id="floatingTextarea2"
          ></textarea>
          <label htmlFor="floatingTextarea2">Address</label>
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
        <p
          className="text-primary pointer text-decoration-underline"
          onClick={() => navigate("/userlogin")}
        >
          Already Have an Account
        </p>
      </form>
    </div>
  );
}

export default UserRegistration;
