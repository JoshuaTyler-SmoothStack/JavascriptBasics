// Libraries
import React, { Component } from 'react';
import GameRecord from './GameRecord';

// Components

// Styles
import './KitStyles.css';

const flexColumn = "d-flex flex-column justify-content-center align-items-center";
const flexRow = "d-flex flex-row justify-content-center align-items-center";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameRecords: [new GameRecord()],
      isXMove: true,
      selectedRecord: 0,
      winner: "",
    };
  }

  render() { 
    const { selectedRecord, gameRecords, winner } = this.state;

    return (
      <main
        className={flexColumn}
        style={{height:"100vh", width:"100vw"}}
      >
        {/* Game Container */}
        <div
          className={"gradient-lightgrey border-radius-xsm border-shadow " + flexColumn}
          style={{height:"500px", width:"350px"}}
        >
          {/* TicTacToe Label */}
          <div 
            className={"bg-smoke border-radius-xsm border-shadow m-2 " + flexRow}
            style={{height:"66px", width:"300px"}}
          >
            {winner === ""
            ? <h1 className="bevel-blue">
                {"Tic-Tac-Toe"}
              </h1>
            : <div className={flexRow}>
                <h2
                  className="ml-auto mr-auto"
                >
                {winner + " wins!"}
                </h2>
              </div>
            }
            
          </div>

          {/* Game Board */}
          <div 
            className="bg-smoke border-radius-xsm border-shadow m-2"
            style={{height: "300px", width:"300px"}}
          >
            {this.handleDrawGameRecord(gameRecords[selectedRecord])}
          </div>

          {/* Game Record Navigation */}
          <div
            className={"gradient-blue border-radius-xsm border-shadow m-2 " + flexRow}
            style={{height:"66px", width:"275px"}}
          >
            {/* Previous Record */}
            <svg 
              className="ml-2 icon-light" 
              height={"40px"} 
              width={"40px"}
              fill={"white"}
              viewBox="0 0 16 16"
              onClick={() => this.handleSelectRecord(-1)}
            >
              <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>

            {/* Current Record Indicator */}
            <h2 className="ml-auto mr-auto" style={{color:"white"}}>
              {"Move: " + selectedRecord + "/" + (gameRecords.length-1)}
            </h2>

            {/* Next Record */}
            <svg 
              className="ml-2 icon-light" 
              height={"40px"} 
              width={"40px"}
              fill={"white"}
              viewBox="0 0 16 16"
              onClick={() => this.handleSelectRecord(1)}
            >
              <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>

            {/* Reset Game */}
            <svg 
                  className="ml-2 icon-light mr-2" 
                  height={"40px"} 
                  width={"40px"}
                  fill={"white"}
                  viewBox="0 0 16 16"
                  onClick={() => this.handleResetGame()}
                >
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>

          </div>
        </div>
      </main>
    );
  }

  handleCheckForWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (var i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
        this.setState({winner: squares[a]});
      }
    }
  }

  handleDrawGameRecord = (gameRecord) => {
    return(
      <div
        className={flexColumn} 
        style={{height:"100%", width:"100%", fontSize:"66px"}}
      >
        <Row values={gameRecord.values} row={0} onClick={(e) => this.handleMove(e)}/>
        <Row values={gameRecord.values} row={1} onClick={(e) => this.handleMove(e)}/>
        <Row values={gameRecord.values} row={2} onClick={(e) => this.handleMove(e)}/>
      </div>
    );
  }

  handleMove = (position) => {
    const { gameRecords, isXMove, selectedRecord, winner } = this.state;
    if(gameRecords[selectedRecord].values[position] !== "" || winner !== "") {
      return;
    }

    let newGameRecords = gameRecords.slice(0, selectedRecord + 1);
    let newGameRecord = new GameRecord(JSON.parse(JSON.stringify(gameRecords[selectedRecord].values)));
    newGameRecord.values[position] = isXMove ? "X" : "O";
    newGameRecords.push(newGameRecord);
    
    this.setState({
      gameRecords: newGameRecords,
      isXMove: !isXMove,
      selectedRecord: selectedRecord + 1,
    });
    this.handleCheckForWinner(newGameRecord.values);
  }

  handleResetGame = () => {
    this.setState({
      gameRecords: [new GameRecord()],
      isXMove: true,
      selectedRecord: 0,
      winner: "",
    });
  }

  handleSelectRecord = (increment) => {
    const { gameRecords, selectedRecord } = this.state;
    const newRecordSelection = Math.max(0, Math.min(gameRecords.length-1, selectedRecord + increment));
    this.setState({selectedRecord: newRecordSelection});
  }
}
export default App;

class Row extends Component {
  render() {
    return(
      <div 
        className={flexRow} 
        style={{height:"33%", width:"100%"}}
      >
        <Square value={this.props.values} row={this.props.row} column={0} onClick={(e) => this.props.onClick(e)}/>
        <Square value={this.props.values} row={this.props.row} column={1} onClick={(e) => this.props.onClick(e)}/>
        <Square value={this.props.values} row={this.props.row} column={2} onClick={(e) => this.props.onClick(e)}/>
      </div>
    );
  }
}

class Square extends Component {
  render() {
    return(
      <div 
        className={"border-shadow-sharp border-shadow-hover " + flexRow} 
        style={{height:"100%", width:"33%"}}
        onClick={() => this.props.onClick((this.props.row * 3) + this.props.column)}
      >
        {this.props.value[(this.props.row * 3) + this.props.column]}
      </div>
    );
  }
}