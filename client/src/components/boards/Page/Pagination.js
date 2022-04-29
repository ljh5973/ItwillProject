import React from 'react';
import {Button} from '@material-ui/core';

function Pagination({total, limit, page, setPage}) {
    const numPages = Math.ceil(total/limit);

    return (
        <>
        <nav style={{display:"flex", justifyContent:"center"}}>
            <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt;
            </Button>
            {Array(numPages)
            .fill()
            .map((_, i) => (
                <Button style={{backgroundColor: "#fbb04c", color: "#fff"}} variant="contained"
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
                >
                {i + 1}
                </Button>
            ))}
            <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page === numPages}>
            &gt;
            </Button>
        </nav>
        
        </>

    );
}





export default Pagination