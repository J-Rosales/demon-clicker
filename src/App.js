import React, { Component } from 'react'
import './App.css'
import MinionButton from './components/Minion/MinionButton'
import UpgradeButton from './components/Upgrade/UpgradeButton'
import ActionButton from './components/Action/ActionButton'
import PlayerResource from './components/Player/PlayerResource'
import jsxicon from './scripts/jsxicon.jsx'
import gameData from './scripts/gameData'
import UIPanel from './components/UIPanel/UIPanel'

//import { listenerCount } from 'cluster'
//import { updateExpression } from '@babel/types'
/*
- IMPLEMENT ESTATE
- Implement currency into UINumber, by having a "hasIcon" option, as well as returning
  different currency icons
- implement time
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveString     : "default",
      time           : 0,
      panels         : ['main', 'estate', 'shop', 'upgrades', 'summoning'],
      //actions        : gameData.getGameAsset('actions'), later
      minions        : gameData.getGameAsset('minions'),
      upgrades       : gameData.getGameAsset('upgrades'),
      achievements   : gameData.getGameAsset('achievements'),
      playerResources: gameData.getGameAsset('playerResources'),
      buyables       : gameData.getGameAsset('buyables'),
      fireIcon       : jsxicon('fire'),
      houseIcon      : jsxicon('house', '#18184E', 'small'),
      timer          : null

    }
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
        } else { // use a handler so this only changes when necessary
          const resourceArray = []
          for (const minionName in minions){
            if (minions[minionName].effect.hasOwnProperty(playerResource)){
              resourceArray.push(minions[minionName].effect[playerResource] * playerResources[minionName].amount)
            }
          }
          const increaseSum = resourceArray.reduce((total, element) => total + (element) , 0)
          playerResources[playerResource].increasePerTick = increaseSum
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
          upgrade.hidden = true

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

  dragButtonHandler = () => {

  }

  viewButtonHandler = () => {

  }

  render () {
  
    const playerResourceNames = Object.getOwnPropertyNames(this.state.playerResources)
    const playerResourcePanel = (
      <>
        {
          playerResourceNames.map(name => {
            const resource = this.state.playerResources[name]
            let effectObject = ""
            let increasePerTick = resource.increasePerTick
            if (resource.isMinion){
              effectObject = this.state.minions[name].effect
              increasePerTick = undefined
            }
            return resource.hidden ? null : (
              <PlayerResource
                key = {resource.id} 
                iconImg = {resource.icon}
                name = {resource.displayName}
                amount = {resource.amount}
                increasePerTick = {increasePerTick}
                max = {resource.max}
                isMinion = {resource.isMinion}
                effectObject = {effectObject}
              />
          )})}
      </>
    )
    
    const upgradeNames = Object.getOwnPropertyNames(this.state.upgrades)
    const upgradeButtons = upgradeNames.map(name => {
      const upgrade = this.state.upgrades[name]
      return upgrade.hidden ? null : (
        <UpgradeButton
          key = {upgrade.id}
          click = {() => this.upgradeButtonHandler(upgrade)}
          productName = {upgrade.displayName}
          cost = {upgrade.cost}
          type = {upgrade.type} />
      )})

    const minionNames = Object.getOwnPropertyNames(this.state.minions)
    const unlockedMinions = minionNames.filter((minion) => {
      return this.state.minions[minion].unlocked
    })

    const minionButtons = unlockedMinions.map(name => {
      const minion = this.state.minions[name]
      return (
      <MinionButton
        key = {minion.id}
        cost = {minion.cost}
        click = {() => this.minionButtonHandler(minion, name)}
        label = {minion.displayName} />
      )})

    const shopButtons = (
      <div className="col py-4">
        {"placeholder"}
      </div> 
    )

    const informationPanel = (
      <></>
    )
    const mainPanels = (
      <>
        <div className='col-2 text-center'>
          <UIPanel header="Actions">
            <div className="col">        
              <ActionButton
                  iconImg = {this.state.fireIcon}
                  click= {() => this.energyButtonHandler()}
                  name='Pillage'/>
            </div>
          </UIPanel>
        </div>
        <div className='col-5 text-center'>
          <UIPanel header="Resources">
            {playerResourcePanel}
          </UIPanel>
        </div>
        <div className='col-5 text-center'>
          <UIPanel header="Information">
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
          </UIPanel>  
        </div>
      </>
    )

    const estatePanel = (
      <>
        {this.state.houseIcon} {" "}
        Estate goes here
      </>
    )

    const panelData = {
      main      : {
        header: 'Main Panel',
        content: mainPanels
      },
      estate    : {
        header: 'Estate',
        content: estatePanel
      },
      shop      : {
        header: 'Shop',
        content: shopButtons
      },
      upgrades  : {
        header: 'Upgrades',
        content: upgradeButtons
      },
      summoning : {
        header: 'Summoning',
        content: minionButtons
      }
    }
    
    const gamePanels = this.state.panels.map(function(key) {
      return (
        <div className='container w-80 bg-light'>
          <UIPanel header={panelData[key].header}
              dragButtonClick={() => this.dragButtonHandler(key)}
              viewButtonClick={() => this.viewButtonHandler(key)}>
            {panelData[key].content}
          </UIPanel>
        </div>
      )
    })
    //this is for dragging
    return (
      <div className="App">
        <div className='container align-bottom'>
          <h1 className='mt-5'>Demon Clicker v0.1.0</h1>
        </div>
        {gamePanels}
      </div>
    )
  }
}
export default App;
