import React, { Component } from 'react'
import './App.css'
import MinionCard from './components/Minion/MinionCard/MinionCard'
import MinionButton from './components/Minion/MinionButton'
import ActionButton from './components/Action/ActionButton'
import StoreButton from './components/Store/StoreButton'
import PlayerResource from './components/Player/PlayerResource'
import jsxicon from './scripts/jsxicon.jsx'
import gameData from './scripts/gameData'

/* Reminder: every drawback is an opportunity to create an unlock.
Try the following: limit the amount of gold and energy the player
can have, this is uncommon in clickers but allow you to a: make it
bigger with an upgrade, b: make a better currency with worse cost/benefit
ratio but less "storage size" */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      energy: 0,
      gold: 0,
      level: 0,
      minions: {
        imps : gameData.getMinionData('imp'),
        nightmares: gameData.getMinionData('nightmare'),
        skeletons: gameData.getMinionData('skeleton')
      }
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

  minionButtonHandler = () => {
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
    const icons = {
      gold : jsxicon('gold'),
      energy : jsxicon('energy'),
      fire : jsxicon('fire'),
      eye : jsxicon('eye')
    }

    // todo: make imps dynamically appear
    let minions
    let minionButton = (
      <MinionButton
          label="Buy Imp"
          cost={[[1, icons.energy]]}/>
    )
    let minionCard = <MinionCard />
    let energyLabel = [
      "( ",
      icons.energy,
      " + 1, ",
      icons.gold,
      " + 1-3 )",
    ]
    let storeButtons = (
      <div className="store-buttons text-center row">
        <StoreButton
          productName="Impish Rune"
          cost={5}/>
        <StoreButton
          productName="Nightmarish Rune"
          cost={5}/>
        <StoreButton
          productName="Skeletal Rune"
          cost={5}/>
      </div>
    )

    return (
      <div className="App">
        <div className='container align-bottom'>
          <h1 className='mt-5'>Demon Clicker v0.1.0</h1>
        </div>
        <div className='container w-80 py-1 bg-light'>
          <div className='row'>
            <div className='col m-2 text-center'>
              <div className="row">
                <div className="col h4">
                  Actions
                </div>
              </div>
              <div className="row align-center">
                <ActionButton
                  iconImg = {icons.fire}
                  click= {() => this.energyButtonHandler()}
                  name='Pillage'
                  effect={energyLabel}/>
              </div>
            </div>
            <div className='col my-1 px-1 text-center'>
              <PlayerResource
                iconImg = {icons.energy}
                name="Dark Energy"
                amount={this.state.energy}
              />
              <PlayerResource
                iconImg = {icons.gold}
                name="Gold"
                amount={this.state.gold}
              />
              <PlayerResource
                iconImg = {icons.eye}
                name="Level"
                amount={this.state.level}
              />
            </div>
            <div className='col my-2 text-center'>
              <div className="row">
                {minionButton}
              </div>
            </div>                    
            <div className='col my-2 text-center'>
              Imps: {this.state.imps}
            </div>
          </div>
          <div className='container px-0'>
            {minions}
          </div>
        </div>
          <div className='container px-0'>
            <div className="row">
              <div className="col-6">upgrades go here</div>
              <div className="col-6">
                {storeButtons}
              </div>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
