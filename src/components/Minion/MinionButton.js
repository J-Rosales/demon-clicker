import React from 'react'
import jsxicon from './../../scripts/jsxicon.jsx'
const uuidv4 = require('uuid/v4')

const minionButton = props => {
    const costLabel = Object.keys(props.cost).map(key => {
      const id = uuidv4()
      return (
        <span key = {id} className="px-1">
          {props.cost[key]} {" "} {jsxicon(key)}
        </span>
    )})

    return (
      <div className="col">
        <button 
            className='col btn-darkberry'
            onClick={props.click}>
          {props.label} ( Cost: {costLabel})
        </button>
      </div>
    );  
}

export default minionButton