import React, { useEffect, useState } from "react";
import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";
import Sale_Tile from "../Components/Sale_tile";
// import { useNavigate } from 'react-router-dom';

export default function User({ uid, setUid }) {
  const [user_data, set_user_data] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [unavailabe, setUnavailable] = useState(false);
  let history = useNavigate();
  let log_out = () => {
    logout();
    setUid("");
    history("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("before profile fetch ", uid);
      try {
        const response = await fetch(
          `https://clashmarketplace-backend.onrender.com/profile/${uid}`
        ); // Replace with your API endpoint
        const jsonData = await response.json();
        console.log("Response:", jsonData.res);
        if (jsonData.res != "" &&jsonData.res != undefined ){
          set_user_data(jsonData.res);
          setIsLoading(false);
        }
        else{
          setIsLoading(false);
          setUnavailable(true);
          console.log(jsonData);
        }
      } catch (error) {
        console.log("Error:", error);
        console.log(
          `https://clashmarketplace-backend.onrender.com/profile/${uid}`
        );
        setIsLoading(false);
        setUnavailable(true);
      }
    };
    fetchData();
  }, [uid]);

  if (isLoading)
    return (
      <div className="Loading_pg">
        <h1 className="loading">Loading</h1>
      </div>
    );

  if (unavailabe)
    return (
      <div className="Loading_pg">
        <h1>Error Occured while accessing</h1>
      </div>
    );
    try{
      return (
        <div id="user">
          <div className="profile">
            <h1>
              name:&#9;<strong> {user_data.name}</strong>
            </h1>
            <h1>
              email:&#9;<strong> {user_data.email}</strong>
            </h1>
            <h1>
              password:&#9;
              <strong>
                {user_data.password
                  ? user_data.password
                  : "Null [Google account login]"}
              </strong>
            </h1>
          </div>
          {user_data.type === "admin" ? (
            <button onClick={() => history("/admin")}>Manage Accounts</button>
          ) : null}
          <button onClick={log_out}>LogOut</button>
    
          <h1>Owned Accounts</h1>
          <div id="owned_accounts">
            {user_data.owned_accounts && user_data.owned_accounts.length > 0 ? (
              user_data.owned_accounts.map((el, i) => (
                <div className="item" key={i}>
                  <h1>title: {el.title}</h1>
                  <h1>description: {el.description}</h1>
                  <h1>price: {el.price}</h1>
                  <h1>email: {el.email ? el.email : null} </h1>
                  <h1>password: {el.password ? el.password : null} </h1>
                </div>
              ))
            ) : (
              <p>No owned accounts found.</p>
            )}
          </div>
        </div>
      );
    }
    catch (e){
      console.log(e)
      console.log(user_data)
      return <>
        <h1>not found</h1>
      </>
    }
}
