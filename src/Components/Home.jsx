import React from 'react'
import Header from './header'
import SaleTiles from './SaleTiles'
import infoImg from '../assets/infoImg.png'

export default function Home(props) {


    const th = [
        {name:"Townhall 10", img_link:'../assets/Town-Hall-10.jpg'},
        {name:"Townhall 11", img_link:'../assets/Town-Hall-11-accounts.jpg'},
        {name:"Townhall 12", img_link:'../assets/Town-Hall-12-accounts.jpg'},
        {name:"Townhall 13", img_link:'../assets/Town-Hall-13-accounts.jpg'},
        {name:"Townhall 14", img_link:'../assets/Town-Hall-14.jpg'},
        {name:"Townhall 15", img_link:'../assets/Town-Hall-15.jpg'},
        {name:"Gold Pass", img_link:'../assets/GoldPass.jpg'},
        {name:"Gems", img_link:'../assets/gems.jpg'},
    ]
  return (
    <div id='Home'>
        <Header/>
        <br />
        <br />
        <h1 className='HomeHeading'>ACCOUNTS FOR SALE</h1>
        <hr />
        <SaleTiles start="0" end="15"/>
        <br />
        <br />
        <h1 className='HomeHeading'>CHOOSE TOWN HALL LEVEL</h1>
        <hr />
        <div className="townhalls">
            {th.map((item, index) => (
                <div key={index} className='townhall'>
                    <img src={item.img_link} alt={item.name} />
                    <h3>{item.name}</h3>
                </div>
            ))}
        </div>
        
        <br />
        <br />
        <br />
        <h1 className='HomeHeading'>CLASH OF CLANS ACCOUNT FOR SALE</h1>
        <hr />
        <div className="info">
            <img src={infoImg} alt="" />
            <div className="data">
                <h1>Buy Clash of Clans Account and Save Your Time</h1>
                <p>Clash of Clans is the most popular game developed Supercell, with over 95 million monthly active players.
<br />
<br />
Since, Clash of Clans is a very time-consuming game, It will be a long journey for you (About 2 to 3 Years) to upgrade everything and reach Town Hall 14 or 15.
<br />
<br />
In fact, you may need to play many months to unlock strong units and make a powerful base like your clan mates. 
<br />
<br />
To cut through all that, you can choose to save thousands of hours and buy Clash of Clans account.</p>
            </div>
        </div>
        <br />
        <hr />
        <h1 className="HomeHeading">BLOGS</h1>
        <hr />
        <div className="blogs">
            <div className="blog">
                <img src="../assets/blog1.jpg" alt="" />
                <h1>How to recover Class of Clans account?</h1>
                <button>Read More</button>
            </div>
            <div className="blog">
                <img src="../assets/blog2.jpg" alt="" />
                <h1>Top Clash Of Clans MarketPlaces in 2023</h1>
                <button>Read More</button>
            </div>
        </div>
        <br />
        <br />
        <br />
        <h1 className="HomeHeading">FAQ</h1>
        <hr />

        <div className="support">
            <div>
                <img src="../assets/warrety.png" alt="" />
                <h1>LIFETIME WARRANTY</h1>
                <h3>We offer the safest and cheapest Clash of Clans account for sale, With a Lifetime Warranty.</h3>
            </div>
            <div>
                <img src="../assets/support.png" alt="" />
                <h1>LIVE SUPPORT</h1>
                <h3>If you have any questions or problems feel free to contact us. We are online 04:00 – 23:00 (UTC)  in the Live Chat</h3>
            </div>
            <div>
                <img src="../assets/delievery.jpg" alt="" />
                <h1>INSTANT DELIVERY</h1>
                <h3>After purchasing a Clash of Clans account, you will receive Gmail login information instantly into your inbox.</h3>
            </div>
        </div>

    </div>
  )
}
