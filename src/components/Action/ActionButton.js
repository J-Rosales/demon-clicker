import React from 'react';

const actionButton = props => {
    return (
        <button
        className='col btn btn-jindigo'
        onClick={props.click}>
          <span className='mx-1'>
            {props.iconImg}
          </span>
          {props.name}
        </button>
    );
}

export default actionButton