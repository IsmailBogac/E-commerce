import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminDashboard() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const commentRef = useRef();
  const categoryRef = useRef();
  const subCategoryRef = useRef();
  const imageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("stock", stockRef.current.value);
    formData.append("comment", commentRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("subcategory", subCategoryRef.current.value);
    formData.append("image", imageRef.current.files[0]);

    console.log(formData);

    try {
      const token = localStorage.getItem("token"); 
      const res = await axios.post(
        "http://localhost:8080/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("Ürün başarıyla kaydedildi", res.data);
      toast.success("Ürün başarıyla yüklendi 👌");

      nameRef.current.value = "";
      priceRef.current.value = "";
      stockRef.current.value = "";
      commentRef.current.value = "";
      categoryRef.current.value = "";
      subCategoryRef.current.value = "";
      imageRef.current.value = "";
    } catch (err) {
      console.error("Ürün yüklenemedi", err);
      toast.error("Ürün  yüklenemedi !");

      const status = err.response?.status;
      const message = err.response?.data?.error;

      if (status === 401 && message === "TokenSuresiDoldu") {
        localStorage.removeItem("token");
        window.location.href = "/adminlogin";
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="product-panel me-5 w-25 bg-secondary">
        <form className="container product-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="name"
              ref={nameRef}
              className="form-control"
              placeholder="T-shirt "
              id="exampleInputName1"
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPrice1" className="form-label">
              Price
            </label>
            <input
              type="text"
              ref={priceRef}
              placeholder="100"
              className="form-control"
              id="exampleInputPrice1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputStock1" className="form-label">
              Stock
            </label>
            <input
              type="text"
              ref={stockRef}
              placeholder="5"
              className="form-control"
              id="exampleInputStock1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputComment1" className="form-label">
              Comment
            </label>
            <input
              type="text"
              ref={commentRef}
              placeholder="Soft and comfortable t-shirt"
              className="form-control"
              id="exampleInputComment1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCategory1" className="form-label">
              Category
            </label>
            <input
              type="text"
              ref={categoryRef}
              placeholder="Clothes"
              className="form-control"
              id="exampleInputCategory1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputSubCategory1" className="form-label">
              Subcategory
            </label>
            <input
              type="text"
              ref={subCategoryRef}
              placeholder="Woman"
              className="form-control"
              id="exampleInputSubCategory1"
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
