import React from 'react';
import jsxicon from '../../scripts/jsxicon';
import UINumber from '../UINumber/UINumber';

const playerResource = props => {

    const effectDisplay = []
    for (const resourceName in props.effectObject){
        const increasePerSecond = props.amount * props.effectObject[resourceName] * 10
        const percentageofTotal = 5
        effectDisplay.push(
          <small key ={"effectId" + new Date().getTime()}> {/* please for the love of god fix this */}
            {jsxicon(resourceName)} + {increasePerSecond.toFixed(2)} /s ({percentageofTotal.toFixed(2)}%)
          </small>
        )
    }
    const dataColumns = props.isMinion ? (
        <>
            <div className="col-2 p-1 border-right-0 border border-jindigo">
                <UINumber value={props.amount} />
            </div>
            <div className="col-5 p-1 border border-jindigo rounded-right">
                {effectDisplay}
            </div>
        </>
    ) : (
        <>
            <div className="col-7 p-1 border border-jindigo rounded-right">
                <UINumber
                    value={props.amount}
                    max = {props.max}/>
            </div>
        </>        
    )

    return (
        <div className="row m-1">
            <div className="col-5 p-1 border border-jindigo rounded-left border-right-0 text-left align-middle">
                <span className='ml-1 mr-2'>
                    {props.iconImg}
                </span>
                {props.name}
            </div>
            {dataColumns}
        </div>
    );
}

export default playerResource