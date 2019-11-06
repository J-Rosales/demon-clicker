import React from 'react';

const minionButton = props => {
    return (
        <div className="col">
            <button className='col btn-primary'
              onClick={props.click}>
                <div className="row text-center">
                  {props.productName}
                </div>
                <div className="row text-center">
                  Cost: {props.cost}
                </div>
            </button>
        </div>
    );
}

export default minionButton