import React from 'react';
import Card from '../Components/Card';
import { AppContext } from '../App'
import LikeNotFound from '../Components/LikeNotFound';


function Liked ( { onAddToLiked }){
  const [ likeNot, setLikeNot ] = React.useState(false);
  const { liked } = React.useContext(AppContext);

        
  return(

    <div className="cards p-40">

    <div className="all__sneakers">
    <h1 className="cards__title">Мои закладки</h1>
    </div>

    <div className="cards__nike">
    {liked.map((item, index) => (
      <Card 
      key={index}
      liked={true}
      onLike ={onAddToLiked}
      {...item}

      />

    )) }  : <LikeNotFound/> 
     </div>
  </div>
  )
}
export default Liked;