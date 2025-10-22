import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetcUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log("Kullanıc bilgisi bulunamadı", err);
        if (err.response && err.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/userlogin");
        }
      }
    };
    fetcUser();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="container my-5">
      <h3>
        Welcome to Your Profile{" "}
        <span className="text-success"> {user?.user.name}</span>
      </h3>
    </div>
  );
}

export default UserDashboard;
