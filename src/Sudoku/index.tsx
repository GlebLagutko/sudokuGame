import * as React from "react";
import {useEffect, useState} from "react";

import {Cell} from "../Cell";
import Generator from "../utils/Generator";
import Solver from "../utils/Solver";
import Square from "../utils/Square";
import {useDispatch, useSelector} from 'react-redux'

import {BUTTON_INPUT} from "../store/actions/ButtonInput";
import {START_GAME} from "../store/actions/StartGame";
import {saveState} from "../store";
import {CHANGE_IS_SOLVED} from "../store/actions/ChangeIsSolved";
import {START_TIMER} from "../store/actions/StartTimer";
import {CHANGE_AUTO_SOLUTION} from "../store/actions/ChangeAutoSolution";
import {SET_SOUND_PLAY} from "../store/actions/SetSoundPlay";

enum DIFFICULTY {
    EASY = 15,
    MEDIUM = 40,
    HARD = 60
}

const pallet: any = {

    0: '#90CAF9', // Box 1
    30: '#1DE9B6', // Box 2
    60: '#FFAB91', // Box 3
    3: '#D1C4E9', // Box 4
    33: '#FFF59D', // Box 5
    63: '#A5D6A7', // Box 6
    6: '#80CBC4', // Box 7
    36: '#F48FB1', // Box 8
    66: '#81D4FA', // Box 9
};


const getCellColor = (row: number, col: number): string => {
    let rowGroup: number = row - (row % 3); // uppermost row index of the box
    let colGroup: number = (col - (col % 3)) * 10; // leftmost col index of the box * 10
    /*
        r\c| 0   30   60
        ----------------
         0 | 0   30   60
         3 | 3   33   63
         6 | 5   36   66
    */
    return pallet[rowGroup + colGroup];
};

// @ts-ignore
let game: Array<Square> = Array<Square>(0);
let solvedGame: Array<Square> = Array<Square>(0);
let currentBoard = Array<Square>(0);

let currentRow: number = -1;
let currentColumn: number = -1;
let currentValue: number = 0;
let firstRender = true;

let buttonInput = state => state.value.buttonInput;
let start = state => state.value.started;
let difficultyState = state => state.value.difficulty;
let autoSolutionState = state => state.value.autoSolution;
let isSolved = state => state.value.isSolved;
let prevInputNumber;
let nextAuto = true;


export function Sudoku() {

    let generator: Generator = new Generator();
    let solver: Solver = new Solver();
    const input = useSelector(buttonInput);
    const isStarted = useSelector(start);
    const difficulty = useSelector(difficultyState);
    const solved = useSelector(isSolved);
    let auto_play = useSelector(autoSolutionState);

    const dispatch = useDispatch();

    let [currentGameCondition, setCurrentBoard] = useState(currentBoard);


    function startGame() {

        // @ts-ignore
        game = JSON.parse(localStorage.getItem('firstBoard')) || generator.generateSudoku(DIFFICULTY[difficulty]);

        currentBoard = JSON.parse(localStorage.getItem('currentBoard')) || JSON.parse(JSON.stringify(game));
        solvedGame = JSON.parse(JSON.stringify(game));

        solver.solveSudoku(solvedGame);
        currentRow = -1;
        currentColumn = -1;
        currentValue = 0;
        setCurrentBoard(currentBoard);
        prevInputNumber = -1;
        localStorage.setItem('firstBoard', JSON.stringify(game));
        localStorage.setItem('currentBoard', JSON.stringify(currentBoard));

        dispatch({type: START_GAME, value: true});
        dispatch({type: BUTTON_INPUT, buttonInput: -1});


        saveState();
        setTimeout(() => dispatch({type: START_TIMER, value: true}), 1100)
        firstRender = false;
    }


    function setNewValueToCell(value: number) {

        currentBoard = JSON.parse(JSON.stringify(currentGameCondition));
        currentBoard[currentRow * 9 + currentColumn].value = value;


        if (checkIsSolved()) {
            dispatch({type: CHANGE_IS_SOLVED, value: true});
            dispatch({type: CHANGE_AUTO_SOLUTION, value: false});
            currentRow = currentColumn = -1
        }

        localStorage.setItem('currentBoard', JSON.stringify(currentBoard));
        if (input === 0 && prevInputNumber === 0) {
            dispatch({type: BUTTON_INPUT, value: -1})
        }
        setCurrentBoard(currentBoard);
    }


    if (prevInputNumber !== input || (input === 0 && prevInputNumber === 0)) {
        if (input >= 0) {
            if (currentRow !== -1) {
                prevInputNumber = JSON.parse(JSON.stringify(input));
                if (currentGameCondition.length !== 0) {
                    setNewValueToCell(input);
                }

            }
        }

    }

    if (!isStarted) {
        localStorage.setItem('firstBoard', JSON.stringify(false));
        localStorage.setItem('currentBoard', JSON.stringify(false));
        startGame();
    } else {
        if (localStorage.getItem('firstBoard') !== undefined) {
            if (firstRender)
                startGame();
        }

    }


    let cells = initCells();
    let rows = initRows();


    function setCurrentCell(row: number, column: number): void {
        currentRow = row;
        currentColumn = column;
        dispatch({type: 'BUTTON_INPUT', buttonInput: 0});
        prevInputNumber = 0;
        setCurrentBoard(JSON.parse(JSON.stringify(currentBoard)));
    }


    function initCells(): React.ReactElement[] {
        const cells: React.ReactElement[] = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentGameCondition.length !== 0)
                    cells.push(<Cell mainColor={getCellColor(i, j)} row={i} column={j}
                                     subGrid={currentBoard[i * 9 + j].subGrid}
                                     focused={currentColumn === j && currentRow === i}
                                     firstValue={game[i * 9 + j].value}
                                     setCurrentCell={setCurrentCell} correctValue={solvedGame[i * 9 + j].value}
                                     currentValue={currentBoard[i * 9 + j].value}/>)
                else
                    cells.push(<Cell mainColor={getCellColor(i, j)} row={i} column={j} focused={false}
                                     setCurrentCell={setCurrentCell} correctValue={0} subGrid={1} firstValue={0}
                                     currentValue={0}/>)

            }
        }
        return cells;
    }


    function initRows(): React.ReactElement[] {
        const rows: React.ReactElement[] = [];
        for (let i = 0; i < 9; i++) {
            const row: React.ReactElement = <tr>
                {
                    cells.map((el, index) => {
                        if (index >= 9 * i && index < 9 * (i + 1))
                            return el;
                    })
                }
            </tr>;
            rows.push(row);

        }
        return rows;
    }

    function checkIsSolved() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentBoard[i * 9 + j].value !== solvedGame[i * 9 + j].value)
                    return false;
            }
        }
        return true;
    }

    useEffect(() => {
        if (auto_play) {
            if (currentBoard.length > 1) {
                if (nextAuto) {
                    for (let i = 0; i < 81; i++) {
                        if (currentGameCondition[i].value !== solvedGame[i].value) {
                            if (nextAuto) {
                                setTimeout(() => {
                                    if (isStarted && !firstRender && auto_play)
                                        setCurrentCell(Math.floor(i / 9), i % 9);
                                }, 50);
                                setTimeout(() => {
                                    nextAuto = true;
                                    if (isStarted && !firstRender && auto_play) {

                                        // @ts-ignore
                                        dispatch({type: SET_SOUND_PLAY, value: true});
                                        setNewValueToCell(solvedGame[i].value);
                                    }
                                }, 50);
                            }
                            nextAuto = false;
                        }
                    }
                }
            }
        }
    }, [currentGameCondition, auto_play]);


    document.body.onkeypress = event => {
        if (event.keyCode >= 49 && event.keyCode <= 57 && currentRow !== -1) {
            if (currentGameCondition.length !== 0) {
                // @ts-ignore
                dispatch({type: SET_SOUND_PLAY, value: true});
                setNewValueToCell(+event.key);
                dispatch({type: BUTTON_INPUT, value: +event.key});

            }
        } else if (event.keyCode == 48) {
            currentValue = 0;
        }
        else if (event.key === 'f' || event.key === 'F' || event.key === 'а' || event.key === 'А') {
            if (!solved)
                document.getElementById("sudoku").requestFullscreen().then();
        }
    };


    return (<div id="sudoku">
            <table>
                <tbody>
                {
                    rows
                }
                </tbody>
            </table>

        </div>
    )

}