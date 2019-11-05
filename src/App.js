import React, { Component } from 'react';
import './App.css';
import MinionCard from './components/Minion/MinionCard/MinionCard';
import MinionButton from './components/Minion/MinionButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      energy: 0,
      imps: 0
    }
  }

  energyButtonHandler = () => {
    const energy = this.state.energy
    this.setState({
      energy: energy + 1
    })
  }

  impButtonHandler = () => {
    let energy = this.state.energy
    let imps = this.state.imps
    if (energy >= 5){
      energy -= 5
      imps++
      this.setState({
        energy: energy,
        imps: imps
      })
    }
  }

  render () {
    // todo: make imps dynamically appear
    let minions = <MinionCard/>
    let minionButton = <MinionButton />

    return (
      <div className="App">
        <div className='container align-bottom'>
          <h1 className='mt-5'>Demon Clicker v0.1.0</h1>
        </div>
        <div className='container w-80 py-1 bg-light'>
          <div className='row h3'>
          <div className='col my-2 text-center'>
              <button
                className='btn btn-primary p-4'
                onClick={() => this.energyButtonHandler()}>
                  Gather Dark Energy
              </button>
            </div>
            <div className='col my-2 text-center'>
              Dark Energy: {this.state.energy}
            </div>
            <div className='col my-2 text-center'>
              {minionButton}
            </div>                    
            <div className='col my-2 text-center'>
              Imps: {this.state.imps}
            </div>
          </div>
          <div className='container px-0'>
            {minions}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
