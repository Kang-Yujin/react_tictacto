import React, { useState } from 'react';
import '../index.css';
import Square from './Square'



export default function Board( props ) {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setxIsNext] = useState(true);


    function renderSquare(i) {
        return <Square 
                    value={ props.squares[i] } 
                    onClick = { () => props.onClick(i) }
                />;
    }

    return (
        <div>
            <div className="board-row">
                { renderSquare(0) }{ renderSquare(1) }{ renderSquare(2) }
            </div>
            <div className="board-row">
                { renderSquare(3) }{ renderSquare(4) }{ renderSquare(5) }
            </div>
            <div className="board-row">
                { renderSquare(6) }{ renderSquare(7) }{ renderSquare(8) }
            </div>
        </div>
    );
}