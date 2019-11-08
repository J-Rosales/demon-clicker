import React from 'react';

const minionButton = props => {
    const costArray = [...props.cost]
    const costLabel = []
    costArray.forEach((costObject) => {
      costLabel.push([costObject.amount, costObject.icon])
    })
    
    return (
      <button 
        className='col btn-primary'
        onClick={props.click}>
        {props.label} (Cost: {props.cost})
      </button>
    );
}

export default minionButton