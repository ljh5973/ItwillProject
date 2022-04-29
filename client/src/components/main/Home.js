import React from 'react';
import './Home.css';
// Home.css 연결
import Header from '../header/Header';
// Header.js 연결
import { Link } from 'react-router-dom';
import Chatbot from '../chatbot/chatbot';

function Home() {
    return (
        <div className="home">
            <Header />
            <div className="home_container1"> 
                <div className="home_container_imgBox1">
                    <img className="home_container1_img1" src="img/container1.png"/>
                    <img className="home_container1_img2" src="img/110.jpg"/>
                    <Link to="/computershop2">
                        <span className="home_container1_text1">Computer Shop</span>
                        <img className='arrow' src="img/ArrowWHT.webp" />
                    </Link>
                    <span className="home_container1_text2">There are only cheap and good things<br/>
                          Ok Drugs helps elevate micro-experiences<br/> for those 
                          who want to check-in to the<br/> moment in a 
                          hard and heavy world.</span>                     
                </div>
                
            </div>
            <div className="home_containerLine">

            </div>
            <div className="home_container2">
                <div className="home_container_imgBox2">
                    <img className="home_container2_img1" src="img/container2-1.jpg"/>
                    <img className="home_container2_img2" src="img/container2-2.jpg"/>
                    <img className="home_container2_img3" src="img/container2-3.jpg"/>
                    <Link to="camerashop">
                        <span>Camera Shop</span>                        
                    </Link>
                  
                </div>
            
            </div>
            <div className="home_containerLine">

            </div>
            <div className="home_container3">
                <div className="home_container_imgBox3">
                    <img className="home_container3_img1" src="img/container3-1.jpg"/>
                    <img className="home_container3_img2" src="img/container3-2.png"/>
                    <Link to="board">
                        <span className="home_container3_text1">Board</span> 
                        <img className='arrow2' src="img/ArrowWHT.webp" />                       
                    </Link>
                  
                </div>
                
            </div>
            <div className='chatbotArea'>
                <Chatbot> </Chatbot>
            </div>

        </div>        
    );
}


export default Home;