import React, { useState } from "react";
import ProductPage from "../pages/ProductPage";

export default function Sale_Tile(props) {
  let element = props.element;
  let [BigView,setBigView] = useState(false);
  return (
    <div className="SaleTile">
      <img
        src={element.image1_url}
        alt="image1"
        onMouseOver={(e) => (e.currentTarget.src = element.image2_url)}
        onMouseOut={(e) => (e.currentTarget.src = element.image1_url)}
      />
      <h1>{element.title}</h1>
      <div className="details">
        <p>{element.description}</p>
        <p>
          <span>$</span>
          {element.price}
        </p>
      </div>
      {!BigView && <button onClick={()=> setBigView(!BigView)}>Show Details</button>}
      {BigView?<ProductPage item={element} uid={props.uid} close={setBigView}/>:null}
    </div>
  );
}
