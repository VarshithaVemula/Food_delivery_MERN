import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id]
      }));

    const amount = getTotalCartAmount() + 2;
    const userId = localStorage.getItem("userId");

    const address = `${data.firstName} ${data.lastName}, ${data.street}, ${data.city}, ${data.state} - ${data.zipcode}, ${data.country}. Phone: ${data.phone}`;

    try {
      const res = await axios.post(`${url}/api/order/place`, {
        userId,
        items: orderItems,
        amount,
        address
      }, { headers: { token } });

      if (!res.data.success) {
        return alert("Order placement failed");
      }

      const { order, razorpayKey, orderId } = res.data;

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        name: "Food Delivery",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(`${url}/api/order/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId
            }, { headers: { token } });

            if (verifyRes.data.success) {
              alert("Payment successful!");
              navigate("/myorders");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Payment verification failed");
          }
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order Error:", err);
      alert("Something went wrong while placing the order.");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' />
          <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email address' />
        <input required name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='City' />
          <input required name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} type="text" placeholder='Zip code' />
          <input required name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
        </div>
        <input required name='phone' value={data.phone} onChange={onChangeHandler} type="tel" placeholder='Phone' />
      </div>

      <div className="place-order-left">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-detail">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
