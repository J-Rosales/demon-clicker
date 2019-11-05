import React, { Component } from 'react';
//import './MinionResource.css';

class MinionResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'NewResource',
      max: 100,
      min: 0
    }
  }

  render () {

    return (
    <div className="row progress-row">
        <div className="col-5 mx-0 px-1">
            <label className="ml-1 px-0">{this.state.name}</label>
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
    );
  }
}
export default MinionResource;
