import React from 'react';
import './Profile.css';
import Header from '../header/Header';


function Profile() {
    return (
        <>
        <Header />
        <div className="home_containerLine" />
        <div className="profile">
            <form className='profileList' >
                <label className="profileTitle">이름</label>
                <input type="text" />
                <label className="profileTitle">이메일</label>
                <input type="email" />
                <label className="profileTitle">주소</label>
                <input type="text" className="addr1"/>
                <input type="text" className="addr2"/>
                <input type="text" className="addr3"/>

            </form>


        </div>
        
        
        
        </>
    );
}




export default Profile