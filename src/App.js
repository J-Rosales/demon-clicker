import React, { Component } from 'react';
import './App.css';
import MinionCard from './components/Minion/MinionCard/MinionCard';
import MinionButton from './components/Minion/MinionButton';
import ActionButton from './components/Action/ActionButton';
import StoreButton from './components/Store/StoreButton';
import PlayerResource from './components/Player/PlayerResource';


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
        imps: 0,
        nightmares: 0,
        skeletons: 0
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
    let Icons64 = {
      // todo, add color by using style-fill: #FFFFFF, perhaps add it as part of the color data?
      // todo2: make icon into a component? can/should you use components as instances of a class?
      // every component having a copy of the image dictionary sounds like a bad idea
      imageDictionary : {
        'energy' : 'PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMy41IDIwYzEuMTA0IDAgMiAuODk2IDIgMnMtLjg5NiAyLTIgMi0yLS44OTYtMi0yIC44OTYtMiAyLTJ6bS0xMC41MDIgNGMtLjU5OCAwLTIuNDI5LTEuNzU0LTIuNzQ3LTQuMzA0LS40MjQtMy40MTQgMi4xMjQtNS41OTMgNC40MTMtNS44Ny41ODctMS44OTUgMi40NzUtNC42ODQgNi40MzQtNC43Ny43NTgtMS45ODIgMy40MDktNC41MDcgNi44NC0zLjE4NiAxLjY0Ny42MzQgMy4xMDEgMi4xMDEgMy43MDUgMy43MzcuMjMxLjYyNC0uNzEuOTY1LS45MzcuMzQ3LS41MS0xLjM3OC0xLjczNy0yLjYxNS0zLjEyNy0zLjE1MS0yLjU3Ny0uOTktNC42OTUuNzMxLTUuNDIyIDIuMjk4IDEuMTA3LjEyIDIuMDkyLjQ1NSAyLjc1NS44ODkuOTA5LjU5NCAxLjQ3MyAxLjU1OCAxLjUwOCAyLjU3Ny4wMzEuODg5LS4zMyAxLjY4Ny0uOTkxIDIuMTg3LS42NTQuNDk2LTEuNDkyLjY0My0yLjI5OC40MDQtLjk2Ni0uMjg2LTEuNzQ4LTEuMDc2LTIuMTQzLTIuMTY5LS4yODctLjc5My0uMzg0LTEuODQ3LS4xNzgtMi45MjEtMy4wNjQuMTg1LTQuNTM3IDIuMzA2LTUuMDc1IDMuNzQyIDEuMTguMTAyIDIuMjExLjU3NCAyLjgzMSAxLjAxMi45NTkuNjc2IDEuNDk3IDEuNiAxLjUxMyAyLjU5OS4wMTUuODU5LS4zNjMgMS42NjQtMS4wMTEgMi4xNTUtLjYwOC40Ni0xLjUzNS41OTktMi4zNjMuMzQ4LS45NjEtLjI4OS0xLjctMS4wNDEtMi4wNzktMi4xMTgtLjI1NS0uNzIzLS4zNzUtMS43NzYtLjIwNC0yLjkxOS0xLjYzMS4zNjEtMy41MTIgMS45OTUtMy4xNzggNC42ODUuMTggMS40NDggMS4wMDggMi44ODggMi4wMTUgMy41MDIuNDMuMjYxLjI0Mi45MjYtLjI2MS45MjZ6bTE3LjMwOC0xMC4wMjZsMS4yMDUgMi4yMjUgMi40ODkuNDU5LTEuNzQ0IDEuODMzLjMzMyAyLjUwOS0yLjI4My0xLjA5Mi0yLjI4MyAxLjA5Mi4zMzMtMi41MDktMS43NDQtMS44MzMgMi40ODktLjQ1OSAxLjIwNS0yLjIyNXptLTE0Ljg1LjgyMmMtLjIwMiAxLjAyNC0uMTI4IDEuOTkzLjExMyAyLjY3OC4zNDcuOTg0Ljk2NiAxLjM1NSAxLjQyNCAxLjQ5Mi42MDQuMTgzIDEuMTc1LjAzNiAxLjQ3Mi0uMTg3LjM4OC0uMjk0LjYyNC0uODA4LjYxNC0xLjM0LS4wMTEtLjY3My0uMzk4LTEuMzEzLTEuMDktMS44MDEtLjU0NS0uMzg1LTEuNDc5LS44MDMtMi41MzMtLjg0MnptNi4zNzMtNC43MTZjLS4yMjYgMS4wMTgtLjExIDEuOTkuMDk5IDIuNTY5LjI4Ny43OS44MjggMS4zNTYgMS40ODYgMS41NS41MDEuMTQ4IDEuMDE0LjA2IDEuNDExLS4yNDIuMzk4LS4zMDEuNjE1LS43OTUuNTk2LTEuMzU1LS4wMjUtLjcwNS0uNDA5LTEuMzUzLTEuMDU2LTEuNzc1LS41MTEtLjMzNC0xLjQ0OC0uNjU3LTIuNTM2LS43NDd6bS03LjMyOS0xMC4wOGwxLjQ2OCAyLjcxMSAzLjAzMi41NTgtMi4xMjQgMi4yMzQuNDA1IDMuMDU3LTIuNzgxLTEuMzMxLTIuNzgxIDEuMzMxLjQwNS0zLjA1Ny0yLjEyNC0yLjIzNCAzLjAzMi0uNTU4IDEuNDY4LTIuNzExem0xNyAwYzEuMzggMCAyLjUgMS4xMiAyLjUgMi41cy0xLjEyIDIuNS0yLjUgMi41LTIuNS0xLjEyLTIuNS0yLjUgMS4xMi0yLjUgMi41LTIuNXoiLz48L3N2Zz4=',
        'gold' : 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTguNSAyMS41YzIuMDgxIDAgNC4yMzktLjQ4NCA1LjUtMS40MDJ2LjY1MmMwIDEuMjQzLTIuNTYgMi4yNS01LjUgMi4yNS0yLjkzOSAwLTUuNS0xLjAwNy01LjUtMi4yNXYtLjY1MmMxLjI2LjkxOCAzLjQyIDEuNDAyIDUuNSAxLjQwMnptMC01YzIuMDgxIDAgNC4yMzktLjQ4NCA1LjUtMS40MDJ2LjY1MmMwIDEuMjQyLTIuNTYgMi4yNS01LjUgMi4yNS0yLjkzOSAwLTUuNS0xLjAwNy01LjUtMi4yNXYtLjY1MmMxLjI2LjkxOCAzLjQyIDEuNDAyIDUuNSAxLjQwMnptMCAyLjVjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMXYuNjUxYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUxYzEuMjYuOTE3IDMuNDIgMS40MDEgNS41IDEuNDAxem0wLTVjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMXYuNjUxYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUxYzEuMjYuOTE3IDMuNDIgMS40MDEgNS41IDEuNDAxem0wLTEzYy0yLjkzOSAwLTUuNSAxLjAwNy01LjUgMi4yNXMyLjU2MSAyLjI1IDUuNSAyLjI1YzIuOTQgMCA1LjUtMS4wMDcgNS41LTIuMjVzLTIuNTYtMi4yNS01LjUtMi4yNXptLjE3NCAzLjI4di4yMmgtLjM1NHYtLjIwOGMtLjM2LS4wMDMtLjc0My0uMDU2LTEuMDU4LS4xNTJsLjE2Mi0uMzQzYy4yNjkuMDYzLjYwNi4xMjYuOTExLjEyNmwuMjI5LS4wMTRjLjQwNS0uMDUzLjQ4Ni0uMzAxLjAzNy0uNDE5LS4zMjgtLjA5LTEuMzM1LS4xNjYtMS4zMzUtLjY3NSAwLS4yODQuMzY3LS41MzcgMS4wNTQtLjU5M3YtLjIyMmguMzU0di4yMTFjLjI1OC4wMDUuNTQ0LjAzLjg2My4wOWwtLjEyOC4zNDJjLS4yNDMtLjA1MS0uNTE0LS4wOTktLjc3OS0uMDk5bC0uMDc5LjAwMWMtLjUzMS4wMi0uNTczLjI4Ny0uMjA3LjM5OS42MDIuMTY5IDEuMzk0LjI5MiAxLjM5NC43NC0uMDAxLjM1OC0uNDc3LjU0OS0xLjA2NC41OTZ6bS0uMTc0IDcuMjJjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMnYuNjUyYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUyYzEuMjYuOTE4IDMuNDIgMS40MDIgNS41IDEuNDAyem0wLTVjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMnYuNjUyYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUyYzEuMjYuOTE4IDMuNDIgMS40MDIgNS41IDEuNDAyem0wIDIuNWMyLjA4MSAwIDQuMjM5LS40ODQgNS41LTEuNDAxdi42NTFjMCAxLjI0My0yLjU2IDIuMjUtNS41IDIuMjUtMi45MzkgMC01LjUtMS4wMDctNS41LTIuMjV2LS42NTFjMS4yNi45MTcgMy40MiAxLjQwMSA1LjUgMS40MDF6bS0xMyAyYy0yLjkzOSAwLTUuNSAxLjAwNy01LjUgMi4yNXMyLjU2MSAyLjI1IDUuNSAyLjI1YzIuOTQgMCA1LjUtMS4wMDcgNS41LTIuMjVzLTIuNTYtMi4yNS01LjUtMi4yNXptLjE3NCAzLjI4di4yMmgtLjM1M3YtLjIwOGMtLjM2MS0uMDAzLS43NDQtLjA1Ni0xLjA1OC0uMTUybC4xNjItLjM0M2MuMjY5LjA2My42MDcuMTI2LjkxMS4xMjZsLjIyOS0uMDE0Yy40MDUtLjA1My40ODctLjMwMS4wMzgtLjQxOS0uMzI5LS4wOS0xLjMzNS0uMTY2LTEuMzM1LS42NzUgMC0uMjg0LjM2OC0uNTM3IDEuMDU0LS41OTN2LS4yMjJoLjM1M3YuMjExYy4yNTguMDA1LjU0NC4wMy44NjMuMDlsLS4xMjguMzQyYy0uMjQzLS4wNTEtLjUxMy0uMDk5LS43NzktLjA5OWwtLjA4LjAwMWMtLjUzLjAyLS41NzIuMjg3LS4yMDYuMzk5LjYwMi4xNjkgMS4zOTMuMjkyIDEuMzkzLjc0LS4wMDEuMzU4LS40NzcuNTQ5LTEuMDY0LjU5NnptLS4xNzQgNy4yMmMyLjA4MSAwIDQuMjM5LS40ODQgNS41LTEuNDAydi42NTJjMCAxLjI0My0yLjU2IDIuMjUtNS41IDIuMjUtMi45MzkgMC01LjUtMS4wMDctNS41LTIuMjV2LS42NTJjMS4yNi45MTggMy40MiAxLjQwMiA1LjUgMS40MDJ6bTAtNWMyLjA4MSAwIDQuMjM5LS40ODQgNS41LTEuNDAydi42NTJjMCAxLjI0My0yLjU2IDIuMjUtNS41IDIuMjUtMi45MzkgMC01LjUtMS4wMDctNS41LTIuMjV2LS42NTJjMS4yNi45MTggMy40MiAxLjQwMiA1LjUgMS40MDJ6bTAgMi41YzIuMDgxIDAgNC4yMzktLjQ4NCA1LjUtMS40MDF2LjY1MWMwIDEuMjQzLTIuNTYgMi4yNS01LjUgMi4yNS0yLjkzOSAwLTUuNS0xLjAwNy01LjUtMi4yNXYtLjY1MWMxLjI2LjkxNyAzLjQyIDEuNDAxIDUuNSAxLjQwMXoiLz48L3N2Zz4=',
        'crystal' : 'something'
      },
      getImage(propName) {
        let imagePrefix = "data:image/svg+xml;base64,"
        let imageString = imagePrefix + this.imageDictionary[propName]
        return (
          <img src={imageString}></img>
        )
      }
    }


    // todo: make imps dynamically appear
    let Icon = <img src="data:image/svg+xml;base64,"></img>
    let minions;
    let minionButton = <MinionButton />
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
              <div className="row">
                <ActionButton />
              </div>
            </div>
            <div className='col my-1 px-1 text-center'>
              <PlayerResource
                iconImg = {Icons64.getImage('energy')}
                name="Dark Energy"
                amount={this.state.energy}
              />
              <PlayerResource
                name="Gold"
                amount={this.state.gold}
              />
              <PlayerResource
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
