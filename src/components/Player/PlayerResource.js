import React from 'react'
import jsxicon from '../../scripts/jsxicon'
import UINumber from '../UINumber/UINumber'
const uuidv4 = require('uuid/v4')

const playerResource = props => {
    if (props.name === "Energy"){
        console.log(props.amount)
    }
    const increaseLabel = props.isMinion ? null : `( + ${(props.increasePerTick * 10).toFixed(2)})`
    const effectLabel = Object.keys(props.effectObject).map((key, index) => {
        const id = uuidv4()
        const icon = jsxicon(key, undefined, "small")
        const gainPerSecond = (props.amount * props.effectObject[key] * 10).toFixed(2)
        const percentageofTotal = props.amount.toFixed(2)
        return (
            <small key={id} className="clearfix">
                {icon} + {gainPerSecond} /s ({percentageofTotal}%)
            </small> 
        )
    })
    
    const dataColumns = props.isMinion ? (
        <>
            <div className="col-2 p-1 border-right-0 border border-jindigo">
                <UINumber value={props.amount} />
            </div>
            <div className="col-4 p-1 border border-jindigo rounded-right">
                {effectLabel}
            </div>
        </>
    ) : (
        <>
            <div className="col-6 p-1 border border-jindigo rounded-right">
                <UINumber
                    value={props.amount} 
                    max = {props.max}/>
            </div>
        </>        
    )

    return (
        <div className="row m-1">
            <div className="col-6 p-1 border border-jindigo rounded-left border-right-0 text-left align-middle">
                <span className='ml-1 mr-2'>
                    {props.iconImg}
                </span>
                {props.name} {increaseLabel}
            </div>
            {dataColumns}
        </div>
    );
}

export default playerResource