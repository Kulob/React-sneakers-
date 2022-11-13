import React from 'react';
import { Link } from 'react-router-dom';
// import { useCart } from '../hooks/useCart';
import { useSelector } from 'react-redux';
import { addItem } from '../redux/slice/basketSlice';

function Header(props) {
  // const { totalPrice } = useCart();
  const totalPrice = useSelector((state) => state.basket);
  return (
    <header className="header__top">
      <Link to="/">
        <div className="header__content">
          <img className="logo" width={40} height={40} src="img/logo.png" alt="logo"></img>
          <div className="header__info">
            <h2 className="title">REACT SNEAKERS</h2>
            <p className="text">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className="header__inner">
          <li onClick={props.onBasketClick} className="header__icons cu-p">
            <img width={18} height={18} src="img/cart.svg" alt="Корзина"></img>
            <span className="ml-10">{totalPrice} руб.</span>
          </li>
          <li className="header__icons">
            <Link to="/liked">
              <img width={18} height={18} src="img/heart.svg" alt="Пользователь"></img>
            </Link>
          </li>
          <li className="header__icons">
            <Link to="/orders">
              <img width={18} height={18} src="img/user.svg" alt="user"></img>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;
