import React, { Component } from 'react'
import './Minion.css'

class Minion extends Component {
  constructor(props, name, level) {
    super(props)
    this.name = name,
    this.level = level
    this.state = {
      name: 1,
      costPropertyName: 'energy',
      costAmount: 0
    }
  } 
  // investigar si un constructor derrota el proposito de un estado. se busca crear tres monstruos
  // Adding a method to the constructor
  greet() {
    return `${this.name} says hello.`
  }

    render () {
      return (
        <div></div>
        )
    }
  }
  
export default App
