import { useState } from 'react'

export default function Tile({hasBomb, bombCounter, winningConditionCallback, updateTilesCountCallback, revealAdjacentTilesCallback}) {
    const [revealed, setRevealed] = useState(false);
    const [hasFlag, setHasFlag] = useState(false);

    const handleClick = () => {
        if(!hasFlag && !revealed) {
            setRevealed(true);
            if(hasBomb) winningConditionCallback(true);
            else {
                updateTilesCountCallback();
            }
            if(bombCounter === 0) revealAdjacentTilesCallback();
        }
    }
    const handleContextMenu = (e) => {
        e.preventDefault();
        setHasFlag(!hasFlag);
    }

    return (
        <td className={revealed ? "revealed" : "unrevealed"} onClick={handleClick} onContextMenu={handleContextMenu}>
            {revealed && !hasBomb ? <p className={"count-"+bombCounter}>{bombCounter > 0 ? bombCounter : false}</p> : false}
            {revealed && hasBomb ? <p>💥</p> : false}
            {!revealed && hasFlag ? <p>📍</p> : false}
        </td>
    )
}