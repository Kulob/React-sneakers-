import React from 'react';
import Card from '../Components/Card';


function Home (
  {items,
    searchValue,
    onChangeSearchValue,
    onChangeRemove,
    onAddToCart,
    onAddToLiked,
    isLoading}
) {


  const renderItems = () => {
    const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(12)] : filtredItems)
      .map((item, index) => (
        <Card 
        key={index}
        onPlus ={(obj) => onAddToCart(obj)}
        onLike ={(obj) => onAddToLiked (obj)}
        loading = {isLoading}
        {...item}
        /> 
       
      )) 
  }
  return(

    <div className="cards p-40">

    <div className="all__sneakers">
    <h1 className="cards__title">{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
    <div className="search">          
      <img className="search__img" width={15} height={15} src="img/search.svg" alt="search"></img>
      <input onChange={onChangeSearchValue} value={searchValue} className="search__btn" type="text" placeholder="Поиск..."/>
      {searchValue &&
      <img 
      onClick={onChangeRemove} 
      className='search__remove' 
      src="/img/btn-remove.svg" alt="image" ></img>}
    </div>
    </div>
    <div className="cards__nike">
     {renderItems()}
     </div>
  </div>
  )
}
export default Home;