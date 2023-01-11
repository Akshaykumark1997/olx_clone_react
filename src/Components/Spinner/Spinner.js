import React from 'react';
import './Spinner.css';

function Spinner() {
  return (
    <div>
      <div className="overlay"></div>
        <div className="spin">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
         </div>
    </div>
  )
}

export default Spinner

