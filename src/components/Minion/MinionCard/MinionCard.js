import React from 'react'
import './MinionCard.css'
import cardImage from './ImpImg.png'

const minioncard = (props) => {
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
                        <div className="row progress-row">
                            <div className="col-5">
                                <label className="ml-1 px-0">Label Text</label>
                            </div>
                            <div className="col">
                                <div className="progress h-100 w-100">
                                    <div className="progress-bar bg-primary" role="progressbar"
                                         aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                        progressvalue
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default minioncard;