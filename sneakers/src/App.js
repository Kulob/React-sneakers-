import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Basket from './Components/Basket';
import Header from './Components/Header';

import Home from './Pages/Home';
import Liked from './Pages/Liked';
import Orders from './Pages/Orders';
import FullSneakers from './Pages/FullSneakers';
import NotFound from './Pages/NotFound';

export const AppContext = React.createContext({});

function App() {
  const [basketOpened, setBasketOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartBasket, setCartBasket] = React.useState([]);
  const [liked, setLiked] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartBasketResponse, likedResponse, itemsResponse] = await Promise.all([
          axios.get('https://631cf06a4fa7d3264cb9b24b.mockapi.io/card'),
          axios.get('https://631cf06a4fa7d3264cb9b24b.mockapi.io/liked'),
          axios.get('https://631cf06a4fa7d3264cb9b24b.mockapi.io/items'),
        ]);
        setIsLoading(false);
        setCartBasket(cartBasketResponse.data);
        setLiked(likedResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }
    fetchData();
  }, []);
  //   const cartBasketResponse = await axios.get(
  //     'https://631cf06a4fa7d3264cb9b24b.mockapi.io/card',
  //   );
  //   const likedResponse = await axios.get('https://631cf06a4fa7d3264cb9b24b.mockapi.io/liked');
  //   const itemsResponse = await axios.get('https://631cf06a4fa7d3264cb9b24b.mockapi.io/items');

  //   setCartBasket(cartBasketResponse.data);
  //   setLiked(likedResponse.data);
  //   setItems(itemsResponse.data);
  // }

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartBasket.find((item) => item.parentId === obj.id);
      if (findItem) {
        setCartBasket((prev) => prev.filter((item) => item.parentId !== obj.id));
        await axios.delete(`https://631cf06a4fa7d3264cb9b24b.mockapi.io/card/${findItem.id}`);
      } else {
        setCartBasket((prev) => [...prev, obj]);
        const { data } = await axios.post('https://631cf06a4fa7d3264cb9b24b.mockapi.io/card', obj);
        setCartBasket((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  const onRemoveItem = (id) => {
    axios.delete(`https://631cf06a4fa7d3264cb9b24b.mockapi.io/card/${id}`);
    setCartBasket((prev) => prev.filter((item) => item.id !== id));
  };
  const onChangeRemove = () => {
    setSearchValue('');
  };
  const onAddToLiked = async (obj) => {
    try {
      if (liked.find((likObj) => likObj.id === obj.id)) {
        axios.delete(`https://631cf06a4fa7d3264cb9b24b.mockapi.io/liked/${obj.id}`);
        setLiked((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://631cf06a4fa7d3264cb9b24b.mockapi.io/liked', obj);
        setLiked((prev) => [...prev, data]);
      }
    } catch (error) {
      alert(' Не удалось добавить в Liked');
    }
  };

  const isItemAdded = (id) => {
    return cartBasket.some((obj) => obj.parentId === id);
  };

  return (
    <AppContext.Provider
      value={{ items, cartBasket, liked, setBasketOpened, isItemAdded, setCartBasket }}
    >
      <div className="app clear">
        {basketOpened && (
          <Basket
            items={cartBasket}
            onBasketClose={() => setBasketOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

        <Header onBasketClick={() => setBasketOpened(true)} />

        <Routes>
          <Route
            path=""
            element={
              <Home
                items={items}
                cartBasket={cartBasket}
                searchValue={searchValue}
                onChangeSearchValue={onChangeSearchValue}
                onChangeRemove={onChangeRemove}
                onAddToCart={onAddToCart}
                onAddToLiked={onAddToLiked}
                isLoading={!items.length}
              />
            }
          />
          <Route path="liked" element={<Liked onAddToLiked={onAddToLiked} />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/sneakers/:id" element={<FullSneakers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
