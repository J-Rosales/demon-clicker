import React from 'react'
import jsxicon from './../../scripts/jsxicon.jsx'
import { Button, Col, Row } from 'reactstrap';
import UINumber from '../UINumber/UINumber.js';

const minionButton = props => {
    const costLabel = Object.keys(props.cost).map((key, index) => {
      return (
        <span key={index} className="px-1">
          <UINumber type="accounting" value={props.cost[key]}/> {" "} {jsxicon(key)}
        </span>
    )})

    return (
      <Col className="my-2">
        <Button color="darkberry" onClick={props.click}>
          <Row>
            <Col>{props.label}</Col>
          </Row>
          <Row>
            <Col>( Cost: {costLabel})</Col>
          </Row>
        </Button>
      </Col>
    )
}

export default minionButton