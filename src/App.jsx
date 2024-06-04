import { useState } from 'react'
import './App.css'
import Tile from './components/Tile';


function App() {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [bombs, setBombs] = useState(10);
  const [gameLost, setGameLost] = useState(false);
  const [remainingTiles, setRemainingTiles] = useState(width * height);

  const placeBombsRandomly = () => {
    const coords = [];
    while(coords.length < bombs) {
      const coord = Math.floor(Math.random() * (width * height));
      if(coords.indexOf(coord) < 0) coords.push(coord);
    }
    return coords.map(el => {
      const row = Math.floor(el/width);
      const column = el - (row * width);
      return {row, column}
    })
  };

  const updateTilesCount = () => {setRemainingTiles(remainingTiles - 1)}

  const checkWinningCondition = (isLost) => {
    if(!gameLost && isLost) {
      alert("You lose!");
      setGameLost(true);
    }
    if(remainingTiles === bombs) {
      alert("You win!");
    }
  }

  const revealAdjacentTiles = (ref) => {
    console.log(ref);
  }

  const [grid, setGrid] = useState(() => {
    const bombsCoord = placeBombsRandomly();
    const result = [];
    for(let i = 0; i < height; i++) {
      const row = [];
      for(let j = 0; j < width; j++) {
        const putBomb = bombsCoord.filter(el => el.row === i && el.column === j).length > 0;
        const counter = bombsCoord.filter(el => (el.row === i-1 || el.row === i || el.row === i+1) && (el.column === j-1 || el.column === j || el.column === j+1)).length
        row.push(
          <Tile key={"row-" + i + "-col-" + j} hasBomb={putBomb} bombCounter={counter} winningConditionCallback={checkWinningCondition} updateTilesCountCallback={updateTilesCount} revealAdjacentTilesCallback={revealAdjacentTiles}/>
        )
      }
      result.push(<tr key={"row-" + i}>{row}</tr>)
    }
    return result;
  });

  return (
    <>
      <header className="container">
        <h1>MINESWEEPER</h1>
      </header>
      <main>
        <section className="left">
          
        </section>
        <section className="middle">
          <table>
            <tbody>
              {grid}
            </tbody>
          </table>
          <div>
            gameLost: {gameLost ? "true" : "false"}
          </div>
          <div>
            remainingTiles: {remainingTiles}
          </div>
        </section>
        <section className="right">

        </section>
      </main>
    </>
  )
}

export default App
