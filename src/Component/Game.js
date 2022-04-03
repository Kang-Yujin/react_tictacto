import React, { useState } from 'react';
import '../index.css';
import Board from './Board'
import Square from './Square';

export default function Game() {
    
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setxIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    // 틱택토 승자 구하기.
    function calculateWinner(squares) {
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
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
    }
    
    function handleClick(i) {
        const tmpHistory = history.slice(0, stepNumber + 1);
        const current = history[tmpHistory.length - 1];
        const squares = current.slice();

        // 누군가 승리 했거나 이미 채워진 칸이면 아무것도 하지 않음.
        if (calculateWinner(squares) || squares[i])
        {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory( [...history, squares ] );
        setxIsNext(!xIsNext);
        setStepNumber(history.length);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setxIsNext( step % 2 === 0 );
    }


    const current = history[stepNumber];
    const winner = calculateWinner(current);

    const moves = history.map( (step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move) }>{desc}</button>
            </li>
        );
    });


    let status;
    if (winner)
    {
        status = "Winner: " + winner;
    }
    else
        status = "Next player: " + (xIsNext ? 'X' : 'O');

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current} onClick={(i) => handleClick(i)} />
                <br /><br />Written by Yujin Kang
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );

}