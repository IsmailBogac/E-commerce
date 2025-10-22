import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const starArray = Array(5).fill(0);
  return (
    <Link to={`/products/${product._id}`}>
      <div className="card" key={product.id}>
        <div>
          <img src={product.imgUrl} className="card-img" />
        </div>
        <div className="card-body">
          <div className="comment  info">
            <p className=" my-0 comment">{product.comment}</p>
          </div>
          <div className="stars  info">
            <p className="my-0 ">
              {starArray.map((_, index) => (
                <i key={index} className="bi bi-star text-warning star"></i>
              ))}
            </p>
          </div>
          <div className="price fw-bold  info">
            <p className=" my-0">{product.price} TL</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
