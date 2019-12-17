import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import './App.css'
import MinionButton from './components/Minion/MinionButton'
import UpgradeButton from './components/Upgrade/UpgradeButton'
import ActionButton from './components/Action/ActionButton'
import PlayerResource from './components/Player/PlayerResource'
import jsxicon from './scripts/jsxicon.jsx'
import gameData from './scripts/gameData'
import UIPanel from './components/UIPanel/UIPanel'
const uuidv4 = require('uuid/v4')

//import { listenerCount } from 'cluster'
//import { updateExpression } from '@babel/types'
/*IMPLEMENT ESTATE
  Implement currency into UINumber, by having a "hasIcon" option, as well as returning
    different currency icons: A [currency N icon], B [currency N-1 icon]... X [currency n-j icon]
  implement time
  implement hide/how as return (<app div> this.state.visible && jsxElements} </app div>)
  fix playerResourcesPanel mapping for return shorthand


  check whether or not you need to pass data as a state property to use getDerivedStateFromProps(props, state) 
  otherwise research how to derive a state without unwrapping the react component (YouTube)
  */

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saveString     : "default",
      time           : 0,
      panels         : {
        main: {
          index  : 0,
          id     : uuidv4(),
          header : 'Main Panel',
        },
        estate: {
          index  : 1,
          id     : uuidv4(),
          header : 'Estate',
        },
        shop : {
          index  : 2,
          id     : uuidv4(),
          header : 'Shop',
        },
        upgrades : {
          index  : 3,
          id     : uuidv4(),
          header : 'Upgrades',
        },
        summoning: {
          index  : 4,
          id     : uuidv4(),
          header : 'Summoning',
        }
      },
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
        } else {
          const resourceArray = []
          for (const minionName in minions){
            if (minions[minionName].effect.hasOwnProperty(playerResource)){
              resourceArray.push(minions[minionName].effect[playerResource] * playerResources[minionName].amount)
            }
          }
          const increaseSum = resourceArray.reduce((total, element) => total + (element), 0)
          playerResources[playerResource].increasePerTick = increaseSum
        }
      }
      return {time}
      }), 100)
  }

  getProgressString = () => {}

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
      for (const key in prevState.playerResources) {
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
      const playerResourcePanel = Object.getOwnPropertyNames(this.state.playerResources).map(name => {
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
      )})
    
    const upgradeNames = Object.getOwnPropertyNames(this.state.upgrades)
    const upgradesPanelContent = upgradeNames.map(name => {
      const upgrade = this.state.upgrades[name]
      return upgrade.hidden ? null : (
        <UpgradeButton
          key = {upgrade.id}
          name = {name}
          click = {() => this.upgradeButtonHandler(upgrade)}
          productName = {upgrade.displayName}
          cost = {upgrade.cost}
          type = {upgrade.type} />
      )})

    const minionNames = Object.getOwnPropertyNames(this.state.minions)
    const unlockedMinions = minionNames.filter((minion) => {
      return this.state.minions[minion].unlocked
    })

    const summoningPanelContent = unlockedMinions.map(name => {
      const minion = this.state.minions[name]
      return (
      <MinionButton
        key = {minion.id}
        cost = {minion.cost}
        click = {() => this.minionButtonHandler(minion, name)}
        label = {minion.displayName} />
      )})

    const shopPanelContent = (
      <div className="col py-4">
        {"placeholder"}
      </div> 
    )

    const mainPanelContent = (
      <>
        <div className='col-2 text-center'>
          <div className="row py-1">
            <div className="col h5">
              Actions
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ActionButton
                  iconImg = {this.state.fireIcon}
                  click= {() => this.energyButtonHandler()}
                  name='Pillage'/>
            </div>
          </div>
        </div>
        <div className='col-5 text-center'>
          <div className="row py-1">
            <div className="col h5">
              Resources
            </div>
          </div>
          <div className="row">
            <div className="col">
              {playerResourcePanel}
            </div>
          </div>
        </div>
        <div className='col-5 text-center'>
          <div className="row py-1">
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
      </>
    )

    const estatePanelContent = (
      <>
        {this.state.houseIcon} {" "}
        Estate goes here
      </>
    )

    //this is for dragging
    return (
      <div className="App">
        <div className='container align-bottom'>
          <h1 className='mt-5'>Demon Clicker v0.1.0</h1>
        </div>
        <UIPanel header="Main Panel" key={this.state.panels.main.id} isTop={true}>
          <div className='row py-1'>
            {mainPanelContent}
          </div>
        </UIPanel>
        <UIPanel header="Estate" key={this.state.panels.estate.id} isTop={true}>
          <div className='row py-1'>
            {estatePanelContent}
          </div>
        </UIPanel>
        <UIPanel header="Shop" key={this.state.panels.shop.id} isTop={true}>
          <div className='row py-1'>
            {shopPanelContent}
          </div>
        </UIPanel>
        <UIPanel header="Upgrades" key={this.state.panels.upgrades.id} isTop={true}>
          <div className='row py-1'>
            {upgradesPanelContent}
          </div>
        </UIPanel>                        
        <UIPanel header="Summoning" key={this.state.panels.summoning.id} isTop={true}>
          <div className='row py-1'>
            {summoningPanelContent}
          </div>
        </UIPanel>                        
      </div>
    )
  }
}

export default App;
