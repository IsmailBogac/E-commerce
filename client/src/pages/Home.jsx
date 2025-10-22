import React, { useEffect, useState } from "react";
import "../App.css";
import { Data } from "../Data";
import Product from ".././components/Product";
import axios from "axios";
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get("http://localhost:8080/api/products");
      console.log(response);
      setProducts(response.data);
    };

    fetchAPI();
  }, []);

  return (
    <div className="container d-flex justify-content-between">
      <div className="hero-title w-25 my-5">
        <h1 className="my-4">This is a title</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic,
          consequatur? Id modi obcaecati quo. Eligendi vel dolorum nam{" "}
        </p>
        <button className="btn btn-success w-50 my-5">Start </button>
      </div>
      <div className="hero-banner slider  my-5 mx-5 ">
        <div className="slide-track">
          {products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
