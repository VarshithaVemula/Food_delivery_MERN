import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("You must be logged in to place an order.");
      return;
    }

    const items = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    const amount = getTotalCartAmount() + 2;
    const address = "Address will be provided in PlaceOrder page";

    try {
      const { data } = await axios.post(`${url}/api/order/place`, {
        userId,
        items,
        amount,
        address,
      }, {
        headers: { token },
      });

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: data.razorpayKey,
        amount: data.order.amount,
        currency: "INR",
        name: "Food Delivery App",
        description: "Payment for your order",
        order_id: data.order.id,
        handler: async function (response) {
          const verifyRes = await axios.post(`${url}/api/order/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: data.orderId,
          }, {
            headers: { token },
          });

          if (verifyRes.data.success) {
            alert("Payment successful!");
            navigate("/myorders");
          } else {
            alert("Payment verification failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment.");
    }
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            {getTotalCartAmount() > 0 && (
              <>
                <div className="cart-total-detail">
                  <p>Delivery Fee</p>
                  <p>₹2</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <button onClick={handlePayment} disabled={getTotalCartAmount() === 0}>
            PAY ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
