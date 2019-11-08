import React from 'react';

const actionButton = props => {
    return (
      <div className="row">
        <button
        className='col btn btn-jindigo'
        onClick={props.click}>
          <div className="row h5">
            <div className="col-2 align-self-center">
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
      </div>
    );
}

export default actionButton