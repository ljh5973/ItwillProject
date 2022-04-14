
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './Subtotal.css';


function Subtotal() {
    return (
        <div className="subtotal">
            <CurrencyFormat 
            renderText={(value) => (
                <>
                <p>
                    총액 (0 items) : <strong> 0원 </strong>


                </p>

                <small className="subtotal_cb">
                    <input type="checkbox" /> 체크박스 입니다.

                </small>

                </>
            )}

            decimalScale= {2}
            // 소수점 몇자리 까지 보여줄껀지
            value={0}
            // 값
            displayType={"text"}
            // 글자 타입
            thousandSeparator={true}
            // 천의 자리 표시
            prefix={"w"}
            // 앞에 표시할 내용
            
            />
            <button>결제하기</button>
            
        </div>
    );
}

export default Subtotal