import React from 'react';
import {timeForToday} from './TimeForToday';



export default function SingleTweet({tweet}) {
    return (
        <div className='tweet'>
            <div className='writer' style={{fontWeight:'bold'}}>{tweet.email}</div>
            <div className='writer'>{tweet.comment}</div>
            <div className='writer' style={{color: '#a9a9a9'}}>{timeForToday(tweet.regdate)}</div>
            <div className='border' style={{borderBottom: '2px solid #a9a9a9'}}></div>
        </div>
    )
}
