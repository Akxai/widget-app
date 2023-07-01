import React, { useState } from "react";

export default function MyCustomWidget() {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showGameOverMessage, setShowGameOverMessage] = useState(false);
  const [openedCellsCount, setOpenedCellsCount] = useState(0);
  const [mines, setMines] = useState(0);
  const [showBombs, setShowBombs] = useState(false);

  const cellContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 20px)", // Adjust the number of columns as needed
    gridGap: "1px",
    backgroundColor: "#ccc",
  };

  const createBoard = (rows, cols) => {
    const newBoard = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          isMine: false,
          isOpen: false,
          adjacentMinesCount: 0,
        });
      }
      newBoard.push(row);
    }
    return newBoard;
  };

  const placeMines = (board, rows, cols, mines) => {
    const flatBoard = [].concat(...board);
    const shuffledIndices = shuffle(Array.from(Array(rows * cols).keys()));
    for (let i = 0; i < mines; i++) {
      const index = shuffledIndices[i];
      flatBoard[index].isMine = true;
    }
    return flatBoard;
  };

  const countAdjacentMines = (cell) => {
    const { row, col } = cell;
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length
        ) {
          if (board[newRow][newCol].isMine) {
            count++;
          }
        }
      }
    }
    return count;
  };

  const revealCell = (cell) => {
    if (gameOver) return;

    const { row, col } = cell;

    if (board[row][col].isOpen) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col].isOpen = true;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      // Game over logic here
      return;
    }

    if (newBoard[row][col].adjacentMinesCount === 0) {
      // If the cell has no adjacent mines, recursively reveal the neighboring cells
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;
          if (
            newRow >= 0 &&
            newRow < newBoard.length &&
            newCol >= 0 &&
            newCol < newBoard[0].length
          ) {
            if (!newBoard[newRow][newCol].isOpen) {
              revealCell(newBoard[newRow][newCol]);
            }
          }
        }
      }
    }

    setBoard(newBoard);
    setOpenedCellsCount((prevCount) => prevCount + 1);
  };

  const handleCellClick = (cell) => {
    if (cell.isOpen || gameOver) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    const { row, col } = cell;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      setShowGameOverMessage(true);
      return;
    }

    newBoard[row][col].isOpen = true;
    newBoard[row][col].isFlag = true; // Set flag if it's not a mine

    setBoard(newBoard);
  };

  const renderCell = (cell) => {
    const { row, col, isMine, isOpen, isFlag, adjacentMinesCount } = cell;

    const cellStyle = {
      width: "20px",
      height: "20px",
      border: "1px solid #ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: isOpen ? "#eee" : "#fff",
    };

    const textStyle = {
      fontSize: "14px",
      fontWeight: "bold",
      display: "none",
      color: isMine ? "red" : "black",
    };

    return (
      <div
        key={`${row}-${col}`}
        style={cellStyle}
        onClick={() => handleCellClick(cell)}
      >
        {isFlag && (
          <span role="img" aria-label="flag">
            🚩
          </span>
        )}
        {isOpen && !isMine && adjacentMinesCount > 0 && (
          <span style={textStyle}>{adjacentMinesCount}</span>
        )}
        {isOpen && isMine && (
          <span role="img" aria-label="mine">
            💣
          </span>
        )}
        {gameOver && isMine && (
          <span role="img" aria-label="mine">
            💣
          </span>
        )}
      </div>
    );
  };

  // Add the game over message with replay button
  const renderGameOverMessage = () => {
    if (openedCellsCount === board.length * board[0].length - mines) {
      return <p>You've won! 🥇</p>;
    }
    return <p>Game Over! 💥</p>;
  };

  const renderBoard = () => {
    return (
      <div style={cellContainerStyle}>
        {board.map((row) => {
          return row.map((cell) => {
            return renderCell(cell);
          });
        })}
      </div>
    );
  };

  const initializeGame = () => {
    const rows = 8;
    const cols = 8;
    const mines = 10;

    const newBoard = createBoard(rows, cols);
    const boardWithMines = placeMines(newBoard, rows, cols, mines);

    const finalBoard = newBoard.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const boardCell = boardWithMines[rowIndex * cols + colIndex];
        const adjacentMinesCount = countAdjacentMines(boardCell);
        return {
          ...boardCell,
          adjacentMinesCount,
        };
      })
    );

    setBoard(finalBoard);
    setGameOver(false);
    setShowGameOverMessage(false);
    setMines(mines);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkWinCondition = () => {
    const totalFlags = board.reduce(
      (count, row) =>
        count + row.filter((cell) => cell.isFlag && cell.isMine).length,
      0
    );
    if (totalFlags === mines) {
      setGameOver(true);
      setShowGameOverMessage(true);
    }
  };

  return (
    <div>
      <h2>Minesweeper Widget</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {renderBoard()}
      </div>
      {showGameOverMessage && renderGameOverMessage()}
      <button onClick={initializeGame}>Start New Game</button>
    </div>
  );
}
