import React, { Component } from 'react'
import './App.css'
import MinionButton from './components/Minion/MinionButton'
import UpgradeButton from './components/Upgrade/UpgradeButton'
import ActionButton from './components/Action/ActionButton'
import PlayerResource from './components/Player/PlayerResource'
import jsxicon from './scripts/jsxicon.jsx'
import gameData from './scripts/gameData'
//import { updateExpression } from '@babel/types'

/* MinionCard will be stateless since it only displays the information that 
  other components are working on.

  State should be changed whenever you would otherwise have mutability.
  Whenever something has to be redrawn (rerendered) since otherwise it
  would have to reload the entire page. */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveString     : "default",
      time           : 0,
      //actions        : gameData.getGameAsset('actions'), later
      minions        : gameData.getGameAsset('minions'),
      upgrades       : gameData.getGameAsset('upgrades'),
      achievements   : gameData.getGameAsset('achievements'),
      playerResources: gameData.getGameAsset('playerResources'),
      buyables       : gameData.getGameAsset('buyables'),
      fireIcon       : jsxicon('fire'),
      houseIcon      : jsxicon('house', '#18184E', 'small'),
      timer          : null

    };
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this.setState(prevState => {
      const time = this.state.time + 1
      const playerResources = {...prevState.playerResources}
      const minions = {...prevState.minions}
      
      for(const playerResource in playerResources){
        if (playerResources[playerResource].isMinion){
          for (const resourceName in minions[playerResource].effect){
           const minionAmount = playerResources[playerResource].amount 
           const minionEffect = minions[playerResource].effect[resourceName]
           const newResourceAmount = playerResources[resourceName].amount + (minionAmount * minionEffect)
           if (newResourceAmount > playerResources[resourceName].max){
            playerResources[resourceName].amount = playerResources[resourceName].max
           } else {
            playerResources[resourceName].amount = newResourceAmount
           }

          } 
        }
      }
      return {time}
      }), 100)
  }

  getProgressString = () => {

  }

  saveFromString = saveString => {
    localStorage['saveFile'] = saveString
  }

  loadFromString = loadString => {
    const appStateObject = JSON.parse(loadString)
    this.setState(appStateObject)
  }

  energyButtonHandler = () => {
    this.setState(prevState => {
      const playerResources = {...prevState.playerResources}
      for (let key in prevState.playerResources) {
        playerResources[key] = prevState.playerResources[key]
      }
      playerResources.energy.amount += 1
      playerResources.currency.amount += Math.floor(Math.random() * 2); 
      return { playerResources }
    })
  }

  minionButtonHandler = (minionObject, minionName) => {
    const costsArray = Object.keys(minionObject.cost).map(function(key) {
      return [key, minionObject.cost[key]];
    });
    const hasResource = (currentCost) => this.state.playerResources[currentCost[0]].amount >= currentCost[1]
    if (costsArray.every(hasResource)){
      this.setState(prevState => {
        let newState = {}
        const playerResources = {...prevState.playerResources}
        const minions = {...prevState.minions}
        
        costsArray.forEach(currentCost => {
          playerResources[currentCost[0]].amount -= currentCost[1]
        })

        for (const currentCost in minionObject.cost){
          minionObject.cost[currentCost] = Math.ceil(minionObject.cost[currentCost] * 1.1)
        }

        playerResources[minionName].amount++
        
        newState = {
          ...prevState,
          playerResources : playerResources,
          minions : minions
        }
        return { newState }
      })
    }
  }

  viewButtonHandler = () => {
    //implement show/hide after functionality icons must be moved to state.
    
  }
  
  upgradeButtonHandler = (upgrade) => {
    const currency = this.state.playerResources.currency.amount

    if (upgrade.type === 'minion') {
      if (currency >= upgrade.cost && this.state.minions[upgrade.value].unlocked === false) {
        this.setState(prevState => {
          let newState = {}
          const minions = {...prevState.minions}
          const playerResources = {...prevState.playerResources}
          
          for (let key in prevState.minions) {
            minions[key] = prevState.minions[key]
          }
          minions[upgrade.value].unlocked = true

          for (let key in prevState.playerResources) {
            playerResources[key] = prevState.playerResources[key]
          }
          playerResources.currency.amount -= upgrade.cost
          playerResources[upgrade.value].hidden = false

          newState = {
            ...prevState,
            minions: minions,
            playerResources: playerResources
          }

          return {newState}
        })
      }
    } else if (upgrade.type === 'estate'){
      if (currency >= upgrade.cost){
        this.setState(prevState => {
          let newState = {}
          const minions = {...prevState.minions}
          const playerResources = {...prevState.playerResources}
          
          playerResources.currency.amount -= upgrade.cost          
          upgrade.hidden = true
          for (const resourceName in upgrade.value){
            playerResources[resourceName].max = upgrade.value[resourceName]
          }

          
          newState = {
            ...prevState,
            minions: minions,
            playerResources: playerResources
          }

          return {newState}
        })
      }
    }
  }

  render () {
    // todo: make imps dynamically appear
    const playerResourceNames = Object.getOwnPropertyNames(this.state.playerResources)
    const playerResourcePanel = (
      <>
        {
          playerResourceNames.map((name, index) => {
          const resource = this.state.playerResources[name]
          let effectObject = ""
          if (resource.isMinion){
            effectObject = this.state.minions[name].effect
          }

          return resource.hidden ? null : (
            <PlayerResource
            key = {index}
            iconImg = {resource.icon}
            name = {resource.displayName}
            amount = {resource.amount}
            max = {resource.max}
            isMinion = {resource.isMinion}
            effectObject = {effectObject}
            />
          )})}
      </>
    )
    
    const upgradeNames = Object.getOwnPropertyNames(this.state.upgrades)
    const upgradeButtons = (
      <>
        {upgradeNames.map((name, index) => {
          const resource = this.state.upgrades[name]
          return resource.hidden ? null : (
            <UpgradeButton
              key = {index}
              click = {() => this.upgradeButtonHandler(resource)}
              productName = {resource.displayName}
              cost = {resource.cost}
              type = {resource.type}
            />
          )})}
      </>
    )


    const minionNames = Object.getOwnPropertyNames(this.state.minions)
    const minionButtons = (
      <>
        {minionNames.map((name, index) => {
          const resource = this.state.minions[name]
          return resource.unlocked ? (
            <MinionButton
              key = {index}
              cost = {resource.cost}
              click = {() => this.minionButtonHandler(resource, name)}
              label = {resource.displayName}
            />
          ) : null
        })}
      </>
    )

     

    return (
      <div className="App">
        <div className='container align-bottom'>
          <h1 className='mt-5'>Demon Clicker v0.1.0</h1>
        </div>
        <div className='container w-80 py-1 bg-light border-bottom'>
          <div className='row'>
            <div className="col">
              <button className="btn float-left">
                {"jsxicon('vdrag')"}
              </button>
              Main Panel (t: {this.state.time})
              <button 
                  className="btn float-right"
                  onClick={() => this.viewButtonHandler()}>
                {"jsxicon('eye')"}
              </button>
            </div>
          </div>
          <div className='row'>
            <div className='col-2 m-2 text-center '>
              <div className="row">
                <div className="col h5">
                  Actions
                </div>
              </div>
              <div className="row align-center">
                <div className="col">  
                  <ActionButton
                    iconImg = {this.state.fireIcon}
                    click= {() => this.energyButtonHandler()}
                    name='Pillage'/>
                </div>
              </div>
            </div>
            <div className='col my-1 px-1 text-center'>
              <div className="row">
                <div className="col h5">Resources</div>
              </div>
              <div className="row">
                <div className="col">{playerResourcePanel}</div>
              </div>
            </div>
            <div className='col border my-2 text-center'>
            <div className="row">
                <div className="col h5">
                  Information
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  </p>
                </div>
              </div>              
            </div>
          </div>
        </div>
        <div className='container w-80 py-1 bg-light'>
          <div className="row">
            <div className="col">Estate</div>
          </div>
          <div className="row py-4">
            <div className="col">
              {this.state.houseIcon} {" "}
              Estate goes here
            </div>
        </div>
        </div>        
        <div className='container w-80 py-1 bg-light'>
          <div className="row">
            <div className="col">Shop</div>
          </div>
          <div className='row'>
            <div className="col-2">
              <button className="btn btn-primary w-100">
                {"[TEST ICON]"}
                data
              </button>
            </div>
            <div className="col-2">
              <button className="btn btn-primary w-100">
                data
              </button>
            </div>
            <div className="col-2">
              <button className="btn btn-primary w-100">
                data
              </button>
            </div>
            <div className="col-2">
              <button className="btn btn-primary w-100">
                data
              </button>
            </div>
            <div className="col-2">
              <button className="btn btn-primary w-100">
                data
              </button>
            </div>
            <div className="col-2">
              <button className="btn btn-primary w-100">
                data
              </button>
            </div>
          </div>
        </div>
        <div className='container w-80 py-1 bg-light'>
          <div className="row">
            <div className="col">Upgrades</div>
          </div>
          <div className='row'>
            {upgradeButtons}            
          </div>
        </div>
        <div className='container w-80 py-1 bg-light'>
          <div className="row">
            <div className="col">Summoning</div>
          </div>
          <div className='row'>
            {minionButtons}                  
          </div>
        </div>     
      </div>
    )
  }
}
export default App;
