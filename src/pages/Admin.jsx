import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Admin(props) {
  const [title1, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [email1, setEmail] = useState("");
  const [password1, setPasword] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState(false);
  const [ErrorText, setErrorText] = useState();

  const history = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      settitle(value);
    } else if (name === "description") {
      setdesc(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "type") {
      setType(value);
    }else if (name === "email") {
      setEmail(value);
    }else if (name === "password") {
      setPasword(value);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "file1") {
      setFile1(files[0]);
    } else if (name === "file2") {
      setFile2(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    const Uid = localStorage.getItem("uid");
    console.log(Uid)
    console.log({
      "uid":Uid,
      "title":title1,
      "description":desc,
      "price":parseFloat(price),
      "type":type,
      "email":email1,
      "password":password1,
      "image1":file1,
      "image2":file2
    }); 
    const formData = new FormData(); 
    formData.append("uid", Uid);
    formData.append("title", title1);
    formData.append("description", desc);
    try{
      formData.append("price", parseFloat(price));
    }catch{
      setloading(false)
      setError(true)
      setErrorText("please set price as int")
    }
    formData.append("type", type);
    formData.append("email", email1);
    formData.append("password", password1);
    formData.append("image1", file1);
    formData.append("image2", file2);
    
    fetch(("http://127.0.0.1:5000/add_data"), {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setloading(false)
        // history('/')
        // Handle response or perform further actions
      })
      .catch((error) => {
        setloading(false)
        console.error("Error:", error);
        setError(true)
        setErrorText("501 server error")
        // Handle error or display error message
      });
  };

  if (loading) return (
    <div className="Loading_div">
      <h1 className="loading">Loading</h1>
    </div>
  )
  if (Error) return (
    <div className="Loading_div">
      <h1 className="Error">Error occured {ErrorText}</h1>
      <button className="Error" onClick={()=>setError(false)}>Go back</button>
    </div>
  )
  return (
    <div id="admin">
      <form onSubmit={handleSubmit} className="content">
        <input
          type="text"
          id="title"
          name="title"
          value={title1}
          placeholder="Product Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="description"
          name="description"
          value={desc}
          placeholder="Description "
          onChange={handleInputChange}
        />
        <div>
        <label htmlFor="type">Type:</label>
        <select id="dropdown" name="type" value={type} onChange={handleInputChange}>
          <option value="TH10">TownHall 10</option>
          <option value="TH11">TownHall 11</option>
          <option value="TH12">TownHall 12</option>
          <option value="TH13">TownHall 13</option>
          <option value="TH14">TownHall 14</option>
          <option value="TH15">TownHall 15</option>
          <option value="GoldP">Gold Pass</option>
          <option value="GEMS">Gems</option>
        </select>
        </div>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          placeholder="price"
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="email"
          name="email"
          value={email1}
          placeholder="account's email"
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="password"
          name="password"
          value={password1}
          placeholder="account's password"
          onChange={handleInputChange}
        />
        <div>
          <label htmlFor="file1">Image 1:</label>
          <input
            type="file"
            id="file1"
            name="file1"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="file2">Image 2:</label>
          <input
            type="file"
            id="file2"
            name="file2"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
