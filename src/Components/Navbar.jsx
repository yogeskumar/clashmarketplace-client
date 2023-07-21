import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  let [th_hover, set_th_hover] = useState(false);

  const handleHover = () => {
    set_th_hover(true);
  };

  const handleMouseLeave = () => {
    set_th_hover(false);
  };
  return (
    <div id="Navbar">
      <div className="nav">
        <div className="first">
          <Link to="/">
            <span>
              <img src="./assets/logo.png" alt="" />
            </span>
          </Link>
          {(props.uid)?(
            <Link to="/Account">Account <span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg></span></Link>
          ):<Link to="/login"><span>Login</span></Link>}
          {console.log(props.uid)}
          <Link to="/Accounts"
            onMouseOver={handleHover}
            onMouseOut={handleMouseLeave}
          >
            <span
              className="acc"
            >
              COC Accounts
            </span>
            <div
        className="nav nav2"
        onMouseOver={handleHover}
        onMouseOut={handleMouseLeave}
        style={{ display: th_hover ? "block" : "none" }}
      >
        <Link to="">
          <span>TOWN HALL 10</span>
        </Link>
        <Link to="">
          <span>TOWN HALL 11</span>
        </Link>
        <Link to="">
          <span>TOWN HALL 12</span>
        </Link>
        <Link to="">
          <span>TOWN HALL 13</span>
        </Link>
        <Link to="">
          <span>TOWN HALL 14</span>
        </Link>
        <Link to="">
          <span>TOWN HALL 15</span>
        </Link>
      </div>
          </Link>
          <Link to="/blog">
            <span>Blogs</span>
          </ Link>
          {/* <a href="/blog">
          </a> */}
          <Link to="/FAQs">
            <span>FAQ</span>
          </Link>
        </div>
        <div>
          <Link to="/Cart">
            <span>Cart {props.cart} / ${props.cartCost}</span>
          </Link>
          
          
        </div>
      </div>
      
    </div>
  );
}
