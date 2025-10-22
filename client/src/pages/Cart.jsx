import axios from "axios";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Sepet alınırken hata:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {}, []);

  const increaseItem = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/cart/increase/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await fetchCart();
    } catch (err) {
      console.error("Ürünü arttırırken bir hata oluştu ", err);
    }
  };

  const decreaseItem = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/cart/decrease/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchCart();
    } catch (err) {
      console.error("Ürünü azaltırken bir hata oluştu", err);
    }
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  if (cart.length === 0) return <div className="my-5 container">
    <p>Sepetiniz boş...</p>
    </div>

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <>
      <div className="px-5  my-5 container">
        <h2>Your Cart 🛍️</h2>
      </div>
      <div className="container cart-container">
        {cart.map((item) => (
          <div
            key={item._id}
            className="d-flex  align-items-center border p-3 mb-2 rounded w-25"
          >
            <Link to={`/products/${item.productId._id}`}>
              <img
                src={item.productId.imgUrl}
                alt={item.productId?.name}
                width="80"
                className="me-3 rounded"
              />
              <div>
                <h5>{item.productId?.name}</h5>
                <h5>{item.productId?.price} ₺</h5>
              </div>
            </Link>
            <button
              className="btn btn-secondary px-2 py-0"
              onClick={() => decreaseItem(item._id)}
            >
              <h5>-</h5>
            </button>
            <h5 className="mx-2"> {item.quantity}</h5>
            <button
              className="btn btn-secondary px-2 py-0"
              onClick={() => increaseItem(item._id)}
            >
              <h5>+</h5>
            </button>
          </div>
        ))}
      </div>
      <div className="container total my-5 d-flex justify-content-around ">
        <h5 className="my-1 ">Toplam :{total} ₺</h5>
        {cart.length === 0 ? (
          ""
        ) : (
          <button className="btn btn-warning  ">Got to Pay <i className="bi bi-credit-card"></i></button>
        )}
      </div>
    </>
  );
}

export default Cart;
