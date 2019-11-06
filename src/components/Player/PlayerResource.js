import React from 'react';

const playerResource = props => {
    return (
        <div className="row m-1">
            <div className="col-8 p-1 border border-jindigo rounded-left border-right-0 text-left align-middle">
                <span className='mx-1'>
                    {props.iconImg}
                </span>
                {props.name}
            </div>
            <div className="col p-1 border border-jindigo rounded-right">
                {props.amount}
            </div>
        </div>
    );
}

export default playerResource