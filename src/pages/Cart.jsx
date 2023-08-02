import React, { useEffect, useState } from 'react'
import Sale_Tile from '../Components/Sale_tile';

export default function Cart(props) {
  let [cart,setCart] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [Error,setError] = useState(false);
  useEffect(()=>{
    const Get_Cart = async ()=> {
      const url = "https://clashmarketplace-backend.onrender.com/cart/get";
      const data = { 
        "Uid":props.uid
       };
  
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCart(data);
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setError(true)
          console.error("Error:", error);
        });
    }
    Get_Cart()
  },[])
  if (isLoading) return (
      <div className="Loading_pg">
        <h1 className="loading">Loading</h1>
      </div>
  )
  if (Error) return (
    <div id="Big_view">
      <div className="Loading_pg">
        <h1 className="Error">Error occured {Text}</h1>
        <button className="Error" onClick={()=>setError(false)}>Go back</button>
      </div>
    </div>
  )

  return (
    <div id='SaleTiles'>
      {cart.map((element, index) => (
      <Sale_Tile key={index} uid={props.uid} element={element}/>
    ))}
    </div>
  )
}
