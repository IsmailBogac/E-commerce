import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminProductTable() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/admin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data);
      } catch (err) {
        console.error("Admin bilgisi alınamadı", err);

        const status = err.response?.status;
        const message = err.response?.data?.error;

        if (status === 401 && message === "TokenSuresiDoldu") {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.href = "/adminlogin";
        }
      }
    };
    fetchAdmin();
  }, []);

  return (
    <div className="container my-5">
      <div>
        {admin ? (
          <h3>
            {" "}
            Welcome to your profile{" "}
            <span className="text-primary">{admin.name}</span>
          </h3>
        ) : (
          <h3>Admin Bilgisi alınamadı</h3>
        )}
      </div>
      <h2 className="my-5">Product Table</h2>
      <div className="product-table">
        {admin ? (
          <table>
            <tr>
              <th className="title">Image</th>
              <th className="title">ID</th>
              <th className="title">Category</th>
              <th className="title">Stock</th>
              <th className="title">Price</th>
            </tr>
            {admin.products.map((item) => (
              <tr key={item._id}>
                <td>
                  <Link to={`/products/${item._id}`}>
                    <img className="table-img " src={item.imgUrl} alt="" />
                  </Link>
                </td>
                <td>{item._id}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </table>
        ) : (
          <h1>Ürün bilgileri getirilemedi</h1>
        )}
      </div>
    </div>
  );
}

export default AdminProductTable;
