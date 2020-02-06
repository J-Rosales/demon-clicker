import React from 'react'
import jsxicon from '../../scripts/jsxicon'
import UINumber from '../UINumber/UINumber'
import { Col, Row } from 'reactstrap'
const uuidv4 = require('uuid/v4')

const playerResource = props => {
    const iconImg = jsxicon(props.iconName)
    const increaseLabel = props.isMinion ? null : (
        <>
            ( +<UINumber type="accounting" value={props.increasePerTick * 10}/>/s)
        </>
    )
    const effectLabel = Object.keys(props.effectObject).map((key, index) => {
        const id = uuidv4()
        const icon = jsxicon(key, undefined, "small")
        const gainPerSecond = (props.amount * props.effectObject[key] * 10).toFixed(2)
        const percentageofTotal = props.amount.toFixed(2)
        return (
            <small key={id} className="clearfix">
                {icon} + <UINumber type="accounting" value={gainPerSecond}/> /s
            </small> 
        )
    })
    
    const dataColumns = props.isMinion ? (
        <>
            <Col md="2" className="p-1 border-right-0 border border-jindigo">
                <UINumber value={props.amount} type="accounting"/>
            </Col>
            <Col md="4" className="p-1 border border-jindigo rounded-right">
                {effectLabel}
            </Col>
        </>
    ) : (
        <>
            <Col md="6" className="p-1 border border-jindigo rounded-right">
               <UINumber value={props.amount} type="accounting" max = {props.max}/>
            </Col>
        </>        
    )
    return (
        <Row className="m-1">
            <Col md="6" className="border border-jindigo rounded-left border-right-0 text-left p-1">
                <span className='ml-1 mr-2'>
                    {iconImg}
                </span>
                {props.name} {increaseLabel}
            </Col>
            {dataColumns}
        </Row>
    )
}

export default playerResource