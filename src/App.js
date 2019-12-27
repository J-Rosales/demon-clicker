import React, { Component } from 'react'
import { Container, Row, Col, Button, ButtonGroup, Badge } from 'reactstrap';
//import ReactDOM from 'react-dom'
import './App.css'
import MinionButton from './components/Minion/MinionButton'
import UpgradeButton from './components/Upgrade/UpgradeButton'
import PlayerResource from './components/Player/PlayerResource'
import jsxicon from './scripts/jsxicon.jsx'
import gameData from './scripts/gameData'
import UIPanel from './components/UIPanel/UIPanel'
import UINumber from './components/UINumber/UINumber'
import {lzw_encode, lzw_decode} from './scripts/lzwCompress'
//import colors from './scripts/colors';
const uuidv4 = require('uuid/v4')

//import { listenerCount } from 'cluster'
//import { updateExpression } from '@babel/types'
/*Implement currency into UINumber, by having a "hasIcon" option, as well as returning
  fix playerResourcesPanel mapping for return shorthand
  make time into object

  TODO: Fix Save Slot
  - Implement save/load method, i.e. data is being simplified to reduce file size, it must be
  restructured back beyond just copying the state object
  - Restructure maps that don't return a value into filter-then-map if applicable
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoPanel      : (<>
      Welcome to Demon Clicker. Your goal is to become the most powerful Warlock
      in the land. Click <Badge className="mx-1" color="jindigo">Pillage</Badge>
      to begin your  quest for dark energies, riches and power. You can learn
      additional information by hovering over various elements if on desktop, or
      by clicking / tapping the {jsxicon('question', undefined, 'small')} icons.</>),
      loadInputValue : '',
      lastSave       : null,
      saveString     : "default",
      time           : {
        name      : 'dawn',
        moonIndex : 0,
        value     : 0,
        timer     : null,
        day       : 1,
        year      : 1,
        clock     : '6:00'
      },
      panels         : {
        main      : { index  : 0, id : uuidv4(),  header : 'Main Panel' },
        estate    : { index  : 1, id : uuidv4(),  header : 'Estate'},
        shop      : { index  : 2, id : uuidv4(),  header : 'Shop'},
        upgrades  : { index  : 3, id : uuidv4(),  header : 'Upgrades'},
        summoning : { index  : 4, id : uuidv4(),  header : 'Summoning'}
      },
      saveSlots      : {
        one   : {active : false, name : null, saveString : null},
        two   : {active : false, name : null, saveString : null},
        three : {active : false, name : null, saveString : null}
      },
      //actions        : gameData.getGameAsset('actions'), later
      minions        : gameData.getGameAsset('minions'),
      upgrades       : gameData.getGameAsset('upgrades'),
      //achievements   : gameData.getGameAsset('achievements'),
      playerResources: gameData.getGameAsset('playerResources'),
      estates        : gameData.getGameAsset('estate'),
      fireName       : 'fire',
      currentEstate  : gameData.estate.shack, 
      nextEstateName : 'house',
      nextEstateCost : gameData.estate.house.cost
    }
  }

  componentDidMount = () => {
    this.timerID = setInterval(() => this.timeUpdate(), 100)
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID)
  }

  timeUpdate = () => {
    this.setState(prevState => {
      let hourName = prevState.time.name
      let moonIndex = prevState.time.moonIndex
      let day = prevState.time.day
      let year = prevState.time.year
      const tickTime = 6
      const timeOfDay = {
        dawn : 6, noon : 12,
        dusk : 18, night: 20,
      }            
      const moonPhases = [
        'newMoon',
        'waxingCrescentMoon',
        'firstQuarterMoon',
        'waxingGibbousMoon',
        'fullMoon',
        'wanningGibbousMoon',
        'lastQuarterMoon',
        'waningCrescentMoon'
      ]
      
      let [hours, minutes] = prevState.time.clock.split(":")
      minutes = parseInt(minutes, 10) + 1
      hours = parseInt(hours, 10)
      
      if (minutes >= 60){
        minutes = 0
        if (hours === 23){
          hours = 0
          if (day === 364){
            day = 1
            year++
          } else {
            day++
          }
        } else {
          hours++
        }
      } else {
        minutes+= tickTime
      }

      if (minutes === 0){
        Object.keys(timeOfDay).map(hour => {
          if (hours === timeOfDay[hour]){
            hourName = hour === 'night'? moonPhases[moonIndex]: hour
            if (hourName === 'dawn') moonIndex++
          }
        })
      }
      minutes = ("0" + minutes.toString()).slice(-2)
      hours = ("0" + hours.toString()).slice(-2)
      
      let time = {
        ...prevState.time,
        moonIndex : moonIndex,
        name : hourName,
        value : prevState.time.value + 1,
        clock : `${hours}:${minutes}`,
        day: day,
        year: year
      }
      return {time}
    })
    
    this.setState(prevState => {
      let newState = {}

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
      newState = {
        ...prevState,
        playerResources : playerResources,
      }
      return { newState }
    })
    
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
      playerResources.currency.amount += Math.floor(Math.random() * 2)
      if (playerResources.currency.amount > this.state.currentEstate.limit){
        playerResources.currency.amount = this.state.currentEstate.limit
      }
      return { playerResources }
    })}

  minionButtonHandler = (minionObject, minionName) => {
    const costsArray = Object.keys(minionObject.cost).map(function(key) {
      return [key, minionObject.cost[key]];
    })
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
  
  estateButtonHandler = () => {
    const currency = this.state.playerResources.currency.amount
    if (currency >= this.state.nextEstateCost){
      const estateArray = Object.keys(this.state.estates)
      for (let i = 0; i < estateArray.length; i++){
        if (this.state.estates[estateArray[i]].active){
          const currentEstate = {...this.state.estates[estateArray[i + 1]]}
          const nextEstate = {...this.state.estates[estateArray[i + 2]]}

          this.setState(prevState => {
            let newState = {}
            
            const estates = { ...prevState.estates}
            estates[estateArray[i]].active = false
            estates[estateArray[i + 1]].active = true
          
            const playerResources = {
            ...prevState.playerResources,
              currency : {
                ...prevState.playerResources.currency,
                amount: prevState.playerResources.currency.amount - currentEstate.cost,
                max : estates[estateArray[i + 1]].limit
              }
            }
            newState = {
              ...prevState,
              estates         : estates,
              playerResources : playerResources,
              nextEstateCost  : nextEstate.cost,
              nextEstateName  : estateArray[i + 2],
              currentEstate   : currentEstate
            }
          return (newState)
          })
          break
        }
      }
    }
  }

  upgradeButtonHandler = upgrade => {
    const currency = this.state.playerResources.currency.amount
    if (upgrade.type === 'minion') {
      if (currency >= upgrade.cost && this.state.minions[upgrade.value].unlocked === false) {
        this.setState(prevState => {
          let newState = {}
          const minions = {...prevState.minions}
          const playerResources = {...prevState.playerResources}
          const upgrades = {...prevState.upgrades}
          minions[upgrade.value].unlocked = true
          
          //unlock upgrades that concern unlocked minion(s)
          for (const prevStateUpgrade in prevState.upgrades){
            if (upgrades[prevStateUpgrade].type === 'buff'){
              if (upgrades[prevStateUpgrade].value.hasOwnProperty(upgrade.value)){
                
                upgrades[prevStateUpgrade].hidden = false
              }
            }
          }

          playerResources.currency.amount -= upgrade.cost
          playerResources[upgrade.value].hidden = false
          upgrade.hidden = true

          newState = {
            ...prevState,
            minions: minions,
            upgrades: upgrades,
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
    } else if (upgrade.type === 'buff'){
      /*gameData.addUpgrade('sharpClaws', undefined, 5, 'buff', {
        imp: { effectObject : { energy : 0.2 } } })*/
        if (currency >= upgrade.cost){
          this.setState(prevState => {
            let newState = {}
            const minions = {...prevState.minions}
            const playerResources = {...prevState.playerResources}
            
            playerResources.currency.amount -= upgrade.cost          
            upgrade.hidden = true
            
            // actual effect
            for (const minion in upgrade.value){
              for (const property in minions[minion]){
                if (property === 'effect'){
                  for(const resource in upgrade.value[minion].effectObject){
                    minions[minion][property][resource] += upgrade.value[minion].effectObject[resource]
                  }
                }
              }
            }

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

  loadInputHandler = (e) => {
    this.setState({
      loadInputValue: e.target.value
    });
  }

  saveButtonHandler = () => {
    const date = new Date()
    this.setState({
      infoPanel : `Game Saved. Date: ${date.toLocaleString()} id: ${(Math.random() * 100).toFixed(3)}.`,
      lastSave  : date.toLocaleString(),
    }, () => {
      const assetArrays = ["minions", "upgrades", "playerResources", "estates"].map(asset => (
        Object.keys(this.state[asset]).map(prop => {
          if (this.state[asset].hasOwnProperty(prop)){
            return (Object.keys(this.state[asset][prop]).map((childProp, index )=>{
              if (this.state[asset][prop].hasOwnProperty(childProp)){
                // this format converts ids into nulls, as they are rebuilt when loading
                return index === 0 ? null : this.state[asset][prop][childProp]
        }}))}})
      ))
      const saveState = {
        ...this.state,
        minions : assetArrays[0],
        upgrades : assetArrays[1],
        playerResources : assetArrays[2],
        estates : assetArrays[3],
        newState : null
      }
      localStorage.setItem('saveData', lzw_encode(JSON.stringify(saveState)))
      
      const saveInputText = this.state.loadInputValue
      const isInputEmpty = saveInputText === "" || !saveInputText.replace(/\s/g, '').length
      const saveFileName = isInputEmpty ? new Date().toLocaleString : saveInputText
      this.setState(prevState => {
        const saveSlots = {
          ...prevState.saveSlots,
          one : {
            //...one,
            name : saveFileName,
          }
        }
        return saveSlots
      })
    })
  }

  loadButtonHandler = () => {
    const data = localStorage.getItem('saveData')
    const loadObject = lzw_decode(JSON.parse(data))
    this.setState({
      loadObject
    })
  }


  saveSlotHandler = slotNumberName => {
    const saveSlots = Object.keys(this.state.saveSlots).map(slot => {
      const slotObject = this.state.saveSlots[slot]
      slotObject.active = slotNumberName === slot
      return slotObject
    })
    //saveslots has numbers while this.state.saveslots has letters, why?
    console.log(saveSlots, this.state.saveSlots)
    this.setState({
//      saveSlots : saveSlots
    })
  }

  onElementHover = (name, color, description) => {
    if (description !== this.state.infoPanel){
      this.setState({
        infoPanel : (
          <>
            <Badge className="mr-1" color={color}>{name}</Badge>: {description}
          </>
        )
      })
    }
  }
  render () {
    const fireIcon = jsxicon(this.state.fireName)
    const timeIcon = jsxicon(this.state.time.name, undefined, 'xlarge')
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
          iconName = {resource.iconName}
          name = {resource.displayName}
          amount = {resource.amount}
          increasePerTick = {increasePerTick}
          max = {resource.max}
          isMinion = {resource.isMinion}
          effectObject = {effectObject} />
    )})
    
    const upgradeNames = Object.getOwnPropertyNames(this.state.upgrades)
    const upgradesPanelContent = upgradeNames.map(name => {
      const upgrade = this.state.upgrades[name]
      return upgrade.hidden ? null : (
        <UpgradeButton
          key = {upgrade.id}
          name = {name}
          click = {() => this.upgradeButtonHandler(upgrade)}
          mouseOver = {() => this.onElementHover(upgrade.displayName, upgrade.type === 'buff' ? 'darkrose' : 'jindigo', upgrade.description)}
          productName = {upgrade.displayName}
          cost = {upgrade.cost}
          type = {upgrade.type} />
      )})

    const minionNames = Object.getOwnPropertyNames(this.state.minions)
    const unlockedMinions = minionNames.filter(minion => (
      this.state.minions[minion].unlocked ))

      const summoningPanelContent = unlockedMinions.length === 0 ? (
        <Col className="py-2">
          <em>(You must buy Rune Upgrades to be able to summon minions.)</em>
        </Col>
      )
      : unlockedMinions.map(name => {
      const minion = this.state.minions[name]
      return (
      <MinionButton
        key = {minion.id}
        cost = {minion.cost}
        click = {() => this.minionButtonHandler(minion, name)}
        mouseOver = {() => this.onElementHover(minion.displayName, 'darkberry', minion.description)}
        label = {minion.displayName} />
      )})

    return (
      <div className="App">
        <Container>
          <h1 className='mt-5'>Demon Clicker v0.1.0</h1>
        </Container>
        <UIPanel header="Main Panel"
                 key={this.state.panels.main.id}
                 isTop >
          <Row>
            <Col md="2">
              <Row>
                <Col className="h5"> Actions </Col>
              </Row>
              <Row className="h-50">
                <Col>
                  <Button color="jindigo" className="w-100 h-100"
                      onClick= {() => this.energyButtonHandler()}>
                    {fireIcon} Pillage
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md="5">
              <Row>
                <Col className="h5"> Resources </Col>
              </Row>
              <Row>
                <Col>
                  {playerResourcePanel}
                </Col>
              </Row>
            </Col>
            <Col md="5">
              <Row>
                <Col className="h5"> Information </Col>
              </Row>
              <Row>
                <Col>
                  <p className="text-justify">
                    {this.state.infoPanel}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="h5">Load / Save</Col>
          </Row>
          <Row className="py-3 border">
            <Col md="6">
              <ButtonGroup vertical className="w-100 savegroup">
                <Button color={this.state.saveSlots.one.active ? "darkrose" : "bone"}
                    className="mb-1 py-1" onClick={() => this.saveSlotHandler('one')}>
                  Save Slot 1: {
                    this.state.saveSlots.one.name === null ?
                    (<em>(Empty)</em>) : this.state.saveSlots.one.name
                  }
                </Button>
                <Button color={this.state.saveSlots.two.active ? "darkrose" : "bone"}
                    onClick={() => this.saveSlotHandler('two')}>
                  Save Slot 2: {
                    this.state.saveSlots.two.name === null ?
                    (<em>(Empty)</em>) : this.state.saveSlots.two.name
                  }
                </Button>
                <Button color={this.state.saveSlots.three.active ? "darkrose" : "bone"}
                    className="mt-1 py-1" onClick={() => this.saveSlotHandler('three')} >
                  Save Slot 3: {
                    this.state.saveSlots.three.name === null ?
                    (<em>(Empty)</em>) : this.state.saveSlots.three.name
                  }
                </Button>
              </ButtonGroup>
            </Col>
            <Col md="6">
              <Row>
                <Col>
                  <p className="mb-0">
                    Select a save slot and press <Badge color="darkrose">Save</Badge>
                    to overwrite it. You may provide a name in the input below,
                    otherwise the current date will be used instead.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md="8" className="px-1">
                  <input className="w-100 h-100" type="text"
                      value={this.state.loadInputValue}
                      onChange={this.loadInputHandler}/>
                </Col>
                <Col md="2" className="pr-1">
                  <Button className="w-100 py-1" color="darkrose"
                        onClick={() => this.loadButtonHandler()}>
                      Load
                    </Button>
                </Col>
                <Col md="2" className="pl-1">
                <Button className="w-100 py-1" color="darkrose" 
                        onClick={() => this.saveButtonHandler()}>
                      Save
                    </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </UIPanel>
        <UIPanel header="Estate"
                 key={this.state.panels.estate.id}
                 isTop >
          <Row>
            <Col>
              <Row className="py-1">
                <Col md={{size : 2, offset : 1 }}>
                  {timeIcon}
                </Col>
                <Col md="2">
                  <h3>Year {this.state.time.year}</h3>
                  <h5>Day {this.state.time.day}, {this.state.time.clock}</h5>
                  <h5>t: {this.state.time.value}</h5>
                </Col>
                <Col md="2" className="border-left border-midnight" >
                  {jsxicon(this.state.currentEstate.iconName, undefined, 'xlarge')}
                </Col>
                <Col md="2" className="border-right border-midnight">
                  <Row>
                    <Col className="h5">{this.state.currentEstate.displayName}</Col>
                  </Row>
                  <Row>
                    <Col>Currency Limit:
                      <UINumber type="accounting"
                          value={this.state.currentEstate.limit}/>
                    </Col>
                  </Row>
                </Col>
                <Col md="2">
                  <Button className="w-100 h-100" color="midnight" 
                      onClick={() => this.estateButtonHandler()}
                      onMouseOver={() => this.onElementHover(this.state.estates[this.state.nextEstateName].displayName, 'midnight',this.state.estates[this.state.nextEstateName].description)}>
                    <Row>
                      <Col>
                      {this.state.estates[this.state.nextEstateName].displayName}
                      </Col>
                    </Row>
                    <Row>
                      <Col>(Cost:
                        <UINumber type="accounting" value={this.state.nextEstateCost}/>)
                      </Col>
                    </Row>
                  </Button>
                </Col>                
              </Row>
            </Col>
          </Row>
        </UIPanel>
        <UIPanel header="Upgrades"
                 key={this.state.panels.upgrades.id}
                 isTop >
          <Row>
            {upgradesPanelContent}
          </Row>
        </UIPanel>
        <UIPanel header="Summoning"
                 key={this.state.panels.summoning.id}
                 isTop >
          <Row>
            {summoningPanelContent}
          </Row>
        </UIPanel>                                
      </div>
    )
  }
}

export default App;
