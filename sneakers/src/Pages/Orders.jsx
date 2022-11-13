import React from 'react';
import axios from 'axios';

import Card from '../Components/Card';
import { AppContext } from '../App';


function Orders (){
  const { onAddToLiked, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders ] = React.useState([]);
  const [isLoading, setIsLoading ] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('https://631cf06a4fa7d3264cb9b24b.mockapi.io/order');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false)
      } catch (error) {
        alert('Ошибка');
        console.error(error);
      }

    })();
  }, []);


  return(

    <div className="cards p-40">

    <div className="all__sneakers">
    <h1 className="cards__title">Мои заказы</h1>
    </div>

    <div className="cards__nike">
    {(isLoading ? [...Array(12)] : orders).map((item, index) => (
      <Card     
      key={index}
      loading = {isLoading}
      {...item}

      />

    )) }
     </div>
  </div>
  );
}
export default Orders;