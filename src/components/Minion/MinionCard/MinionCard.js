import React, { Component } from 'react';
import './MinionCard.css'
import cardImage from './ImpImg.png'
import MinionResource from '../MinionResource'

class MinionCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        somevalue: '2'
      }
    }
  
    render () {
        let minionResource = <MinionResource />
        return (
            <div className="card mb-3 minion-card" style={{width: '400px', maxWidth: '540px'}}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={cardImage} className="card-img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body py-0">
                            <div className="row">
                                <h3>Imp</h3>
                            </div>
                            {minionResource}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MinionCard;