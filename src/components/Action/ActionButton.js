import React from 'react';

const actionButton = props => {
    return (
      <div className="row">
        <div className="col-2"></div>
        <button
        className='col-8 btn btn-jindigo'
        onClick={props.click}>
          <div className="row">
            <div className="col">
              {props.iconImg}
            </div>
            <div className="col">
              <div className="row">
                <div className="col">{props.name}</div>
              </div>
              <div className="row">
                <div className="col">{props.effect}</div>
              </div>
            </div>
          </div>
        </button>
        <div className="col-2"></div>
      </div>
    );
}

export default actionButton