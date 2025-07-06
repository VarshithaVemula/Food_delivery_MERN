import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const FoodItem = ({ id, name, price, description, image, rating = 4.2 }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(id);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000); // Disappear after 2 sec
  };

  // ⭐ Render rating stars
  const renderStars = () => {
    return [...Array(5)].map((_, i) => {
      if (rating >= i + 1) return <FaStar key={i} color="tomato" />;
      else if (rating >= i + 0.5) return <FaStarHalfAlt key={i} color="tomato" />;
      else return <FaRegStar key={i} color="tomato" />;
    });
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />

        {cartItems?.[id] > 0 ? (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{cartItems[id]}</p>
            <img onClick={handleAddToCart} src={assets.add_icon_green} alt="Add" />
          </div>
        ) : (
          <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add" />
        )}

        {showMessage && (
          <div className="toast-success">
            <img src={assets.tick_icon} alt="tick" />
            <p>Added to Cart</p>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="rating-stars">{renderStars()}</div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
