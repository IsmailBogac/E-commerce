import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const ref = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const storeRef = useRef();
  const imageRef = useRef();
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminData = new FormData();
    adminData.append("name", nameRef.current.value),
      adminData.append("email", emailRef.current.value),
      adminData.append("password", passwordRef.current.value),
      adminData.append("store", storeRef.current.value),
      adminData.append("profileUrl", imageRef.current.files[0]);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin",
        adminData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ✅ ekle
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error("Admin kayıt hatası:", err);

    }
  };
  return (
    <>
      <form className="container w-25 my-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            ref={emailRef}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            ref={passwordRef}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Store Name</label>
          <input
            type="text"
            ref={storeRef}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Store Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputImage1" className="form-label">
            Image
          </label>
          <input
            type="file"
            ref={imageRef}
            className="form-control"
            id="exampleInputImage1"
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
        <p
          className="pointer text-primary text-decoration-underline"
          onClick={() => navigate("/adminlogin")}
        >
          Already Have an Account
        </p>
      </form>
    </>
  );
}
