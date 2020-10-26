import React, { Component } from 'react'
import "./Board.css"


class Square extends Component{
  render(){
    return(
      <div className="square"></div>
    )
  }
}


export default class Board extends Component {
  constructor(props){
    super(props)
  }
  render() {



    return (
      <div className = "board">
        <Square/>
      </div>
    )
  }
}
