import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import UINumber from '../UINumber/UINumber';
import jsxicon from '../../scripts/jsxicon';

const upgradeButton = props => {
  const buttonColors = {
    minion  : 'jindigo',
    upgrade : 'darkberry',
    buff    : 'darkrose'
  }
  return (
    <Col className="my-2">
      <Button color={buttonColors[props.type]}
          className="w-100 h-100 shadow" onClick={props.click}
          onMouseOver={props.mouseOver}>
        <Row>
          <Col>
            {jsxicon(props.name + "Rune", '#FFFFFF', 'large')}
          </Col>
        </Row>
        <Row>
          <Col>
            {props.productName}
          </Col>
        </Row>
        <Row>
          <Col>
            Cost: <UINumber type='currency' value={props.cost}/>
          </Col>
        </Row>
      </Button>
    </Col>
  );
}

export default upgradeButton