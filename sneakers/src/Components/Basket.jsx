import React from 'react';
import axios from 'axios';

import Info from './Info';
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Basket({ onBasketClose, onRemove, items = [] }) {
  const { cartBasket, setCartBasket, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const basketRef = React.useRef();

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://631cf06a4fa7d3264cb9b24b.mockapi.io/order', {
        items: cartBasket,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartBasket([]);

      for (let i = 0; i < cartBasket.length; i++) {
        const item = cartBasket[i];
        await axios.delete('/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {}
    setIsLoading(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
        if (event.path.includes(basketRef.current)) {
          console.log('Был клик');
          // onBasketClose();
        }
      }
    document.body.addEventListener('click', handleClickOutside);
    return() => {document.body.removeEventListener('click', handleClickOutside)}
  }, []);
  return (
    // {`"outline" ${opened} ? "overlayVisible" : ''`}
    <div ref ={basketRef} className="outline">
      <div  className="basket">
        <h2 className="basket__title">
          КОРЗИНА
          <img onClick={onBasketClose} src="img/btn-remove.svg" alt="image"></img>
        </h2>

        {items.length > 0 ? (
          <>
            <div className="item flex">
              {items.map((obj) => (
                <div key={obj.id} className="basket__contents">
                  <div
                    className="basket__img"
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  ></div>
                  <div className="basket__info">
                    <p>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removebtn"
                    src="img/btn-remove.svg"
                  ></img>
                </div>
              ))}
            </div>

            <div className="basket__total">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб. </b>
                </li>
              </ul>
            </div>
            <button disabled={isLoading} onClick={onClickOrder} className="order">
              Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
            </button>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            text={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Basket;
