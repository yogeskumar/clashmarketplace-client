import React ,{useState}from "react";
// import { useNavigate } from 'react-router-dom';

export default function ProductPage(props) {
  // let navigate = useNavigate()
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState(false);
  const [Text, setText] = useState('');

  function createCheckoutLink(productID) {
    setloading(true)
    const url = "http://localhost:5000/create-checkout-link";
    const data = { 
      "product_id": productID,
      "Uid": props.uid
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
        setloading(false)
        const checkoutLink = data.checkout_link;
        // Redirect the user to the checkout link
        window.location.href = checkoutLink;
      })
      .catch((error) => {
        setloading(false)
        setError(true)
        setText(error)
        console.error("Error:", error);
      });
  }

  const trigger_checkout = (id) => {
    createCheckoutLink("product1");
  };
  
  
  const add_to_cart = (productID) => {
    setloading(true)
    const url = "http://localhost:5000/cart/modify";
    const data = { 
      "user_id": props.uid,
      "cart_item": productID, 
      "action":'add'
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
        setloading(false)
        setText("Successfully added")
        console.log(data)
      })
      .catch((error) => {
        setloading(false)
        setText(error)
        console.error("Error:", error);
      });
  }



  if (loading) return (
    <div id="Big_view">
    <div className="Loading_pg">
      <h1 className="loading">Loading</h1>
    </div>
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
    <div id="Big_view">
      <div className="content">
        <div className="img">
          <img src={props.item.image1_url} alt="" />
          <img src={props.item.image2_url} alt="" />
        </div>
        <hr />
        <div className="data">
            <div>
          <h1>{props.item.title}</h1>
          <p>{props.item.description}</p>
            </div>
          <h2>${props.item.price}.00 USD</h2>
          <div className="btns">
          <button className="buy" onClick={() => createCheckoutLink(props.item.index)}>
            Procede to checkout{" "}
          </button>
          <button className="cart" onClick={() => add_to_cart(props.item.index)}>Add to Cart</button>
          <button className="close" onClick={() => props.close(false)}>Close</button>
          </div>
          {Text?(<h1>{Text}</h1>):null}
        </div>
      </div>
    </div>
  );
}
