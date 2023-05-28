import { Link } from 'react-router-dom';
import './App.css';
import React from 'react';
const generateSquare = (cellWidth, cellHeight, numColors) => {
    const obj = {};
    const square = [];
    for (let row = 0; row < cellHeight; row++) {
        const newRow = [];
        for (let col = 0; col < cellWidth; col++) {
            const randomColor = getRandomColor(numColors)
            obj[randomColor] = obj[randomColor] ? obj[randomColor] + 1 : 1;
            newRow.push(randomColor);
            console.log(obj, newRow);
        }
        square.push(newRow);
    }
    return { square, obj };
}
function getRandomColor(numColors) {
    const colors = [];
    for (let i = 1; i <= numColors; i++) {
        colors.push(i);
    }
    const randomIndex = Math.floor(Math.random() * numColors);
    return colors[randomIndex];
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
function RGBColor() {
    const [squareNumber, setSquareNumber] = React.useState({
        cellWidth: 5,
        cellHeight: 5,
        colors: 5
    })
    const [square, setSquare] = React.useState(() =>
        generateSquare(squareNumber.cellWidth, squareNumber.cellHeight, squareNumber.colors)
    );
    console.log(square);
    const handleOnChange = (e) => {
        setSquareNumber({ ...squareNumber, [e.target.name]: parseInt(e.target.value) })
    }
    const { maxArea, maxColor } = biggestArea(square?.square);
    const createNewSquare = () => {
        const newSquare = generateSquare(squareNumber.row, squareNumber.col, squareNumber.colors)
        setSquare({...square,square:newSquare.square})
    }
    return (
        <div className="App">
            <Link to="/">Color Name</Link>
            <div>
                <input type="number" name='row' className="cellWidth" placeholder='row' onChange={handleOnChange} />
                <input type="number" name='col' className="cellHeight" placeholder='col' onChange={handleOnChange} />
                <input type="number" name='colors' className="colnumber" placeholder='color' onChange={handleOnChange} />
                <button onClick={createNewSquare}>Create New Square </button>
            </div>
            <div className="box" style={{ border: squareNumber.cellHeight && "2px solid black" }}>
                {square?.square?.map((row, i) => (
                    <div className="row" key={i}>
                        {row.map((cell, j) => (
                            <div className="col" key={j}
                                style={{
                                    backgroundColor: `rgb(${cell * 150}, ${cell * 50}, ${cell * 50
                                        })`
                                }}>
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <h2>
                Result:  The Biggest Area Contains  {maxArea} Cells With Color Number  {maxColor}
            </h2>
            <h2>
                {Object.keys(square?.obj)}
                <br />
                {Object.values(square?.obj)}
            </h2>
        </div>
    );
}

export default RGBColor;
