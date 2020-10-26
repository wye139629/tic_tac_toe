import React, { Component } from 'react'
import "./Board.css"


class Square extends Component{
  render(){
    const mark = this.props.mark
    let text = ""
    if(mark === 0){
      text = "O"
    }else if(mark === 1){
      text = "X"
    }

    return(
    <div className="square" onClick={this.clickHandler.bind(this)}>{text}</div>
    )
  }
  clickHandler(){
    const {index, round, update, winner}=this.props
    if(winner !== "") return

    update(index, round)
  }
}



export default class Board extends Component {
  constructor(props){
    super(props)
    let args = Array(9).fill(-1)
    this.state = {
      round: 0,
      marks: [...args],
      winner:""
    }
  }
  render() {
    const {round, marks, winner} = this.state
    return (
      <div className = "board">
        {
          marks.map((mark, index)=>{
            return (<Square index={index} round={round} update={this.update.bind(this)} winner={winner} mark={mark} />)
          })
        }
        <span>winner:{winner}</span>
      </div>
    )
  }

  update(cellIndex, round){
    let currentMark = this.state.marks[cellIndex]

    if(currentMark === -1){
      this.setState((preState)=>{
       let newMark = round%2
       preState.marks[cellIndex] = newMark
       return {
         round: preState.round+1,
         marks: preState.marks,
         winner: this.checkWinner()
        }
      })

    }
  }

  checkWinner(){
    const marks = this.state.marks

    for(let i = 0; i < marks.length; i+=3){
      if(marks[i] === marks[i+1] && marks[i+1] === marks[i+2] && marks[i+2] === 0){
        return "player1"
      }else if(marks[i] === marks[i+1] && marks[i+1] === marks[i+2] && marks[i+2] === 1){
        return "player2"
      }
    }

    for(let i = 0; i < 4; i++){
      if(marks[i] === marks[i+3] && marks[i+3] === marks[i+6] && marks[i+6] === 0){
        return "player1"
      }else if(marks[i] === marks[i+3] && marks[i+3] === marks[i+6] && marks[i+6] === 1){
        return "player2"
      }
    }

    if(marks[0] === marks[4] && marks[4] === marks[8] && marks[8] === 0){
      return "player1"
    }else if(marks[0] === marks[4] && marks[4] === marks[8] && marks[8] === 1){
      return "player2"
    }

    if(marks[2] === marks[4] && marks[4] === marks[6] && marks[6] === 0){
      return "player1"
    }else if(marks[2] === marks[4] && marks[4] === marks[6] && marks[6] === 1){
      return "player2"
    }

    return ""
  }
}
