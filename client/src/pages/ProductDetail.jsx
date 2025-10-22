import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Ürün detayları çağırılırken bir hata oluştu.", err);
      }
    };
    fetchDetail();
  }, [id]);

  var discount = product?.price ? product.price + 30 : null;

  const addToCart = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Ürün sepete eklendi 🛒");
    } catch (err) {
      console.error("Ürünü sepete eklerken bir hata oluştu ", err);
      toast.error("Ürün sepete eklenirken bir hata oluştu  ");
    }
  };

  if (!product) return <p>Yükleniyor...</p>;
  return (
    <>
      <div className="bg-pattern">
        <div className="container">
          <div className="product-details row">
            <div className="col-md-6">
              <img
                src={product.imgUrl}
                alt={product.name}
                className="img-fluid border p-3 product-detail-img"
              />
            </div>
            <div className="col-md-6">
              <div className="product-info ">
                <h2 className="text-success">{product.name}</h2>
                <h4 className="my-2">{product.comment}</h4>
                <div className="prices d-flex  ">
                  <h3 className="text-dark discount my-3 mx-3">
                    <s>{discount} ₺</s>{" "}
                  </h3>
                  <h2 className="my-5"> {product.price} ₺</h2>
                </div>
              </div>

              <div className="d-flex payment gap-4 mt-3">
                <div className="text-center">
                  <i className="bi bi-truck fs-2 text-success"></i>
                  <p>Kargo</p>
                </div>
                <div className="text-center">
                  <i className="bi bi-cash-coin fs-2 text-primary"></i>
                  <p>Kapıda Ödeme</p>
                </div>
                <div className="text-center">
                  <i className="bi bi-shield-lock fs-2 text-warning"></i>
                  <p>Güvenli Ödeme</p>
                </div>
              </div>
              {role === "admin" ? null : (
                <button className="add-cart" onClick={addToCart}>
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="line">
        <span className="line-border"></span>
        <p className="fs-3">About the Seller</p>
        <span className="line-border"></span>
      </div>
      <div className="container my-5">
        <div className="seller-info">
          <div className="profile d-flex w-25">
            <img
              className="img-fluid mx-4 "
              src={product.adminId.profileUrl}
              alt={product.name + " mağaza fotoğrafı"}
            />
            <h3>{product.adminId.store}</h3>
          </div>
          <button className="btn btn-warning">Subscribe</button>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
