import React, { Component } from 'react';
import './App.css';
import MinionCard from './components/Minion/MinionCard/MinionCard';
import MinionButton from './components/Minion/MinionButton';
import StoreButton from './components/Store/StoreButton';
import PlayerResource from './components/Player/PlayerResource';

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
      imageDict = {
        'gold' : 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTguNSAyMS41YzIuMDgxIDAgNC4yMzktLjQ4NCA1LjUtMS40MDJ2LjY1MmMwIDEuMjQzLTIuNTYgMi4yNS01LjUgMi4yNS0yLjkzOSAwLTUuNS0xLjAwNy01LjUtMi4yNXYtLjY1MmMxLjI2LjkxOCAzLjQyIDEuNDAyIDUuNSAxLjQwMnptMC01YzIuMDgxIDAgNC4yMzktLjQ4NCA1LjUtMS40MDJ2LjY1MmMwIDEuMjQyLTIuNTYgMi4yNS01LjUgMi4yNS0yLjkzOSAwLTUuNS0xLjAwNy01LjUtMi4yNXYtLjY1MmMxLjI2LjkxOCAzLjQyIDEuNDAyIDUuNSAxLjQwMnptMCAyLjVjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMXYuNjUxYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUxYzEuMjYuOTE3IDMuNDIgMS40MDEgNS41IDEuNDAxem0wLTVjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMXYuNjUxYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUxYzEuMjYuOTE3IDMuNDIgMS40MDEgNS41IDEuNDAxem0wLTEzYy0yLjkzOSAwLTUuNSAxLjAwNy01LjUgMi4yNXMyLjU2MSAyLjI1IDUuNSAyLjI1YzIuOTQgMCA1LjUtMS4wMDcgNS41LTIuMjVzLTIuNTYtMi4yNS01LjUtMi4yNXptLjE3NCAzLjI4di4yMmgtLjM1NHYtLjIwOGMtLjM2LS4wMDMtLjc0My0uMDU2LTEuMDU4LS4xNTJsLjE2Mi0uMzQzYy4yNjkuMDYzLjYwNi4xMjYuOTExLjEyNmwuMjI5LS4wMTRjLjQwNS0uMDUzLjQ4Ni0uMzAxLjAzNy0uNDE5LS4zMjgtLjA5LTEuMzM1LS4xNjYtMS4zMzUtLjY3NSAwLS4yODQuMzY3LS41MzcgMS4wNTQtLjU5M3YtLjIyMmguMzU0di4yMTFjLjI1OC4wMDUuNTQ0LjAzLjg2My4wOWwtLjEyOC4zNDJjLS4yNDMtLjA1MS0uNTE0LS4wOTktLjc3OS0uMDk5bC0uMDc5LjAwMWMtLjUzMS4wMi0uNTczLjI4Ny0uMjA3LjM5OS42MDIuMTY5IDEuMzk0LjI5MiAxLjM5NC43NC0uMDAxLjM1OC0uNDc3LjU0OS0xLjA2NC41OTZ6bS0uMTc0IDcuMjJjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMnYuNjUyYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUyYzEuMjYuOTE4IDMuNDIgMS40MDIgNS41IDEuNDAyem0wLTVjMi4wODEgMCA0LjIzOS0uNDg0IDUuNS0xLjQwMnYuNjUyYzAgMS4yNDMtMi41NiAyLjI1LTUuNSAyLjI1LTIuOTM5IDAtNS41LTEuMDA3LTUuNS0yLjI1di0uNjUyYzEuMjYuOTE4IDMuNDIgMS40MDIgNS41IDEuNDAyem0wIDIuNWMyLjA4MSAwIDQuMjM5LS40ODQgNS41LTEuNDAxdi42NTFjMCAxLjI0My0yLjU2IDIuMjUtNS41IDIuMjUtMi45MzkgMC01LjUtMS4wMDctNS41LTIuMjV2LS42NTFjMS4yNi45MTcgMy40MiAxLjQwMSA1LjUgMS40MDF6bS0xMyAyYy0yLjkzOSAwLTUuNSAxLjAwNy01LjUgMi4yNXMyLjU2MSAyLjI1IDUuNSAyLjI1YzIuOTQgMCA1LjUtMS4wMDcgNS41LTIuMjVzLTIuNTYtMi4yNS01LjUtMi4yNXptLjE3NCAzLjI4di4yMmgtLjM1M3YtLjIwOGMtLjM2MS0uMDAzLS43NDQtLjA1Ni0xLjA1OC0uMTUybC4xNjItLjM0M2MuMjY5LjA2My42MDcuMTI2LjkxMS4xMjZsLjIyOS0uMDE0Yy40MDUtLjA1My40ODctLjMwMS4wMzgtLjQxOS0uMzI5LS4wOS0xLjMzNS0uMTY2LTEuMzM1LS42NzUgMC0uMjg0LjM2OC0uNTM3IDEuMDU0LS41OTN2LS4yMjJoLjM1M3YuMjExYy4yNTguMDA1LjU0NC4wMy44NjMuMDlsLS4xMjguMzQyYy0uMjQzLS4wNTEtLjUxMy0uMDk5LS43NzktLjA5OWwtLjA4LjAwMWMtLjUzLjAyLS41NzIuMjg3LS4yMDYuMzk5LjYwMi4xNjkgMS4zOTMuMjkyIDEuMzkzLjc0LS4wMDEuMzU4LS40NzcuNTQ5LTEuMDY0LjU5NnptLS4xNzQgNy4yMmMyLjA4MSAwIDQuMjM5LS40ODQgNS41LTEuNDAydi42NTJjMCAxLjI0My0yLjU2IDIuMjUtNS41IDIuMjUtMi45MzkgMC01LjUtMS4wMDctNS41LTIuMjV2LS42NTJjMS4yNi45MTggMy40MiAxLjQwMiA1LjUgMS40MDJ6bTAtNWMyLjA4MSAwIDQuMjM5LS40ODQgNS41LTEuNDAydi42NTJjMCAxLjI0My0yLjU2IDIuMjUtNS41IDIuMjUtMi45MzkgMC01LjUtMS4wMDctNS41LTIuMjV2LS42NTJjMS4yNi45MTggMy40MiAxLjQwMiA1LjUgMS40MDJ6bTAgMi41YzIuMDgxIDAgNC4yMzktLjQ4NCA1LjUtMS40MDF2LjY1MWMwIDEuMjQzLTIuNTYgMi4yNS01LjUgMi4yNS0yLjkzOSAwLTUuNS0xLjAwNy01LjUtMi4yNXYtLjY1MWMxLjI2LjkxNyAzLjQyIDEuNDAxIDUuNSAxLjQwMXoiLz48L3N2Zz4=',
        'crystal' : 'something'
      },
      getImage(propName) {
        return (
          <img src="data:image/svg+xml;base64," {this.imageDict}></img>
          
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
          <div className='row h3'>
          <div className='col my-2 text-center'>
              <button
                className='btn btn-primary p-4'
                onClick={() => this.energyButtonHandler()}>
                  Gather Dark Energy {Icon}
              </button>
            </div>
            <div className='col my-2 text-center'>
              <PlayerResource
                name="Dark Energy"
                amount={this.state.energy}
              />
              <PlayerResource
                name="Gold"
                amount={this.state.energy}
              />
              <PlayerResource
                name="Level"
                amount={this.state.energy}
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
