import React, { useState, useEffect } from 'react';
import Sale_Tile from "./Sale_tile";


export default function SaleTiles(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [unavailabe, setUnavailable] = useState(false);
  const [Account_col, setAccounts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://clashmarketplace-backend.onrender.com/get_data'); // Replace with your API endpoint
        const jsonData = await response.json();
        setAccounts(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setUnavailable(true);
      }
    };

    fetchData();
  }, []);
  if (unavailabe) {
    return (<div className='Loading_pg'>
      <h1>
        Unable to load content
        </h1>
      </div>); // Display loader while fetching data
  }

  if (isLoading) {
    return (
    <div className='Loading_pg'>
      <h1 className='loading'>
        Loading...
        </h1>
    </div> // Display loader while fetching data
    );
  }

  return (
    <div id="Saletiles">
      {Account_col.map((element, index) => (
        <Sale_Tile key={index} uid={props.uid} element={element}/>
      ))}
    </div>
  );
}
