import React, { Fragment, useState, useEffect } from 'react';
import "./Board.css"

export default function Game(){
  const text = Array(9).fill(null)
  const [nextPlayer, setNextPlayer] = useState(1)
  const [history, setHistory] = useState([[...text]])
  const [winner, setWinner] = useState(null)
  const currentTable = history[history.length-1]

  function updateSquare(position){
    const cloneSquareText = currentTable.slice()
    cloneSquareText[position] = nextPlayer? "O":"X"
    nextPlayer? setNextPlayer(0):setNextPlayer(1)

    setHistory(history.concat([cloneSquareText]))
  }

  function goBackStatus(position){
    const targetStatus = history.slice(0, position+1)
    const cloneNextPlayer = (position+1)%2
    setNextPlayer(cloneNextPlayer)
    setHistory(targetStatus)

  }

  useEffect(()=>{
    checkWinner(currentTable)
  })

  function checkWinner(currentSquare){
    const winningCondition = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for(let i =0; i<winningCondition.length; i++){
      const [index1, index2, index3] = winningCondition[i]
      if(currentSquare[index1] === currentSquare[index2] && currentSquare[index2] === currentSquare[index3]){
        setWinner(currentSquare[index1])
      }
    }
  }

  return (
    <div className="container">
      <Table status={{currentTable, winner}} updateSquare={updateSquare}/>
      <div className="game-info">
        <div>Next Player: {nextPlayer?"O":"X"}</div>
        <div>Winner:{winner}</div>
        <Historybtn history={history} goBackStatus={goBackStatus}/>
      </div>
    </div>
  )
}

function Historybtn(props){
  function renderBtn(){
    return props.history.map((value, index)=>{
      return (
        <li key={index}>
          <button onClick={()=>{clickHandler(index)}}>
            {
            index === 0? "Start": `Go to step ${index}`
            }
          </button>
        </li>
      )
    })
  }

  function clickHandler(step){
    props.goBackStatus(step)
  }

  return(
    <ol>
      {renderBtn()}
    </ol>
  )
}



function Table(props) {
  const {currentTable, winner} = props.status
  function renderSquare(){
   return currentTable.map((text, index)=>{
      return <Square key={index} value={{text, index, winner}} updateSquare={props.updateSquare}/>
    })
  }

  return (
    <div className="board">
      {renderSquare()}
    </div>
  )
}

function Square(props) {
  const {text, index, winner} = props.value
  function clickHandler(){
    if(winner !== null) return
    props.updateSquare(index)
  }
  return(
  <div className="square" onClick={clickHandler}>{text}</div>
  )
}
