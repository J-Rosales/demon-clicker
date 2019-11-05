import React from 'react';

const minionButton = props => {
    return (
      <button 
        className='col btn-primary'
        onClick={props.click}>
        {props.name}
      </button>
    );
}

export default minionButton