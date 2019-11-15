import React from 'react';
import './MinionCard.css'
import cardImage from './ImpImg.png'
import MinionResource from '../MinionResource'

const minionCard = props => {
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
                            <h3>{props.minionName}</h3>
                        </div>
                        {minionResource}
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default minionCard