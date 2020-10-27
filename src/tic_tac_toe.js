import React, { Fragment, useState, useEffect } from 'react';
import "./Board.css"

export default function Game(){
  return (
    <div>
      <Table/>
    </div>
  )
}

function Table() {
  const text = Array(9).fill(null)
  const [nextPlayer, setNextPlayer] = useState(1)
  const [squareText, setSquareText] = useState([...text])
  const [winner, setWinner] = useState(null)

  function renderSquare(){
   return squareText.map((text, index)=>{
      return <Square value={{text, index, winner}} updateSquare={updateSquare}/>
    })
  }

  function updateSquare(position){
    const cloneSquareText = squareText.slice()
    cloneSquareText[position] = nextPlayer? "O":"X"
    nextPlayer? setNextPlayer(0):setNextPlayer(1)
    setSquareText(cloneSquareText)
  }

  useEffect(()=>{
    checkWinner(squareText)
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
    <Fragment>
      <div className=''>Next Player: {nextPlayer?"O":"X"}</div>
      <div className="board">
        {renderSquare()}
      </div>
      <div>Winner:{winner}</div>
    </Fragment>
  )
}

function Square(props) {
  // console.log(props)
  const {text, index, winner} = props.value
  function clickHandler(){
    if(winner !== null) return
    props.updateSquare(index)
  }
  return(
  <div className="square" onClick={clickHandler}>{text}</div>
  )
}
