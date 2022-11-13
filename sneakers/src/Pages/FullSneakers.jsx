import React from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FullSneakers = () => {
  const [sneaker, setSneaker] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() =>{
    async function fetchSneakers() {
      try {
        const {data} = await axios.get('https://631cf06a4fa7d3264cb9b24b.mockapi.io/items/' + id)
        setSneaker(data)

      } catch (error) {
        alert('Ошибка!!!');
        navigate('/');
      }
    }
    fetchSneakers();
  }, []);
  if (!sneaker){
    return <> 'Загрузка...' </>
  }
  return (
    <div className="container">
      <img className="sneakers__img" width={500} height={400} src={sneaker.imageUrl} alt="nike"></img>
      <h2>{sneaker.title}</h2>
      <div className="card__price">
              <span>Цена:</span>
              <b>{sneaker.price}руб.</b>
            </div>
    </div>
  )
}

export default FullSneakers;