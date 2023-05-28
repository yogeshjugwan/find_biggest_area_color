import { Link } from 'react-router-dom';
import './App.css';
import React from 'react';
const generateSquare = (cellWidth, cellHeight, numColors) => {
  const square = [];
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray', 'cyan'];
  for (let row = 0; row < cellHeight; row++) {
    const newRow = [];
    for (let col = 0; col < cellWidth; col++) {
      const randomRGBColor = Math.floor(Math.random() * numColors);
      const color = colors[randomRGBColor];
      newRow.push(color);
    }
    square.push(newRow);
  }
  return square;
}
const biggestArea = (square) => {
  let maxArea = 0;
  let maxColor = null;
  const rows = square.length;
  const cols = square[0].length;
  const visited = [];
  for (let row = 0; row < rows; row++) {
    const newRow = [];
    for (let col = 0; col < cols; col++) {
      newRow.push(false);
    }
    visited.push(newRow);
  }
  function dfs(row, col, color) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return 0;
    }

    if (visited[row][col] || square[row][col] !== color) {
      return 0;
    }

    visited[row][col] = true;
    let count = 1;

    count += dfs(row + 1, col, color);
    count += dfs(row - 1, col, color);
    count += dfs(row, col + 1, color);
    count += dfs(row, col - 1, color);

    return count;
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!visited[row][col]) {
        const color = square[row][col];
        const area = dfs(row, col, color);

        if (area > maxArea) {
          maxArea = area;
          maxColor = color;
        }
      }
    }
  }
  return { maxArea, maxColor }
}
function ColorName() {
  const [squareNumber, setSquareNumber] = React.useState({
    cellWidth: 5,
    cellHeight: 5,
    colors: 5
  })

  const [square, setSquare] = React.useState(() =>
    generateSquare(Number(squareNumber.cellWidth), Number(squareNumber.cellHeight), Number(squareNumber.colors))
  );
  // console.log(square);
  const handleOnChange = (e) => {
    setSquareNumber({ ...squareNumber, [e.target.name]: e.target.value })
  }
  const createNewSquare = () => {
    const newSquare = generateSquare(Number(squareNumber.row), Number(squareNumber.col), Number(squareNumber.colors))
    setSquare(newSquare)
  }
  const { maxArea, maxColor } = biggestArea(square);
  return (
    <div className="App">
      <Link to="/rgb">RGB Color</Link>
      <div>
        <input type="number" name='row' className="cellWidth" placeholder='row' onChange={handleOnChange} />
        <input type="number" name='col' className="cellHeight" placeholder='col' onChange={handleOnChange} />
        <input type="number" name='colors' className="colnumber" placeholder='color' onChange={handleOnChange} />
        <button onClick={createNewSquare}>Create New Square </button>
      </div>
      <div className="box" style={{ border: squareNumber.cellHeight && "2px solid black" }}>
        {square.map((row, i) => (
          <div className="row" key={i}>
            {row.map((col, j) => (
              <div className="col" key={j}
                style={{
                  backgroundColor: col
                }}>
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
      <h2>
        Result:  the biggest area contains  {maxArea} cells with  {maxColor} Color
      </h2>
    </div>
  );
}

export default ColorName;
