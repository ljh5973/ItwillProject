import { Search } from '@material-ui/icons';
import React, {useState} from 'react';
import './ComputerBox.css';

function ComputerBox() {
    const category_list = [
        { id: 0, data: '삼성'},
        { id: 1, data: '애플'},
        { id: 2, data: 'LG'},
        { id: 3, data: '삼보'}
    ]
   
    return (
        <>
        <div className='computerbox'>
            <div className="searchbar">
                <input className="computer_search"/><Search className='search_icon'/>
            </div>
            <div className="computer_cbox">
                <span className="computer_name">제조사</span>
                {category_list.map((item) => (
                    <label key={item.id} className="innerBox" >
                        <input type="checkbox" value={item.data}/>
                        <div>{item.data}</div>
                    </label>
                ))}
            </div>
        </div>
        </>
    );
}


export default ComputerBox