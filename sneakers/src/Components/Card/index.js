import React from 'react';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slice/basketSlice.js';
import { Link } from 'react-router-dom';

function Card({ id, title, price, imageUrl, onLike, onPlus, liked = false, loading = false }) {
  const { isItemAdded } = React.useContext(AppContext);
  const obj = { id, parentId: id, title, price, imageUrl };
  const onClickPlus = () => {
    onPlus(obj);
  };
  const { items, totalPrice } = useSelector((state) => state.basket);

  // const dispatch = useDispatch();
  // const onClickAdd = () => {
  //   const item = {
  //     id,
  //     parentId: id,
  //     title,
  //     price,
  //     imageUrl,
  //   };
  //   dispatch(addItem(item));
  // };

  const [likeAdded, setLikeAdded] = React.useState(liked);
  const onClickLike = () => {
    onLike(obj);
    setLikeAdded(!likeAdded);
  };

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="40" rx="12" ry="12" width="150" height="91" />
          <rect x="0" y="145" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="170" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="207" rx="5" ry="5" width="80" height="24" />
          <rect x="117" y="202" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="card__unliked">
            <img
              className="unliked"
              onClick={onClickLike}
              src={likeAdded ? 'img/liked.svg' : 'img/unliked.svg'}
              alt="unliked"
            ></img>
          </div>
          <Link to={`/sneakers/${id}`}>
            <img className="sneakers__img" width={133} height={112} src={imageUrl} alt="nike"></img>
            <h5 className="card__text">{title}</h5>
          </Link>

          <div className="card__info">
            <div className="card__price">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className="card__plus"
                onClick={onClickPlus}
                src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/Group 91.svg'}
                alt="plus"
              ></img>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
