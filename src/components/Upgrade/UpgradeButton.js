import React from 'react';

const upgradeButton = props => {
  const buttonTypeClass = props.type === "minion" ? 'col btn-jindigo' : 'col btn-darkberry'
  
  return (
      <div className="col">
          <button className={buttonTypeClass}
            onClick={props.click}>
              <div className="row">
                <div className="col">
                  {props.productName}
                </div>
              </div>
              <div className="row">
                <div className="col">
                Cost: {props.cost}
                </div>
              </div>
          </button>
      </div>
  );
}

export default upgradeButton