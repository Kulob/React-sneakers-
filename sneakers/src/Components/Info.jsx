import React from 'react'
import { AppContext } from '../App';

const Info = ( {id, title, image, text}) => {
  const { setBasketOpened } = React.useContext(AppContext);
  
  return (
    <div className="basket__empty">
        <img className="mb-20" width="120px"  src={image} alt="image"></img>
        <h2>{title}</h2>
      <p>{text}</p>
        <button onClick={() => setBasketOpened(false)} className="greenButton">
          <img src="/img/arrow.svg" alt="arrow"></img> Вернуться назад
        </button>
        <div>

        </div>
      </div>
  )
}
export default Info;