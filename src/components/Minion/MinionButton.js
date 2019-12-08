import React from 'react'
import jsxicon from './../../scripts/jsxicon.jsx'

const minionButton = props => {

    const costLabel = []
    for (const costProp in props.cost){
      const icon = jsxicon(costProp)
      const amount = props.cost[costProp]
      costLabel.push(
        amount,
        <span
          key = {"minionButtonId" + new Date().getTime()}
          className="px-1">{icon}</span>
        )
      /*MAKE THIS A FOR LOOP TO HAVE A KEY JSX TAG
      if im not at the last iteration:
       add a comma*/
    }
    
    return (
      <div className="col">
        <button 
            className='col btn-darkberry'
            onClick={props.click}>
          {props.label} ( Cost: {costLabel} )
        </button>
      </div>
    );
}

export default minionButton