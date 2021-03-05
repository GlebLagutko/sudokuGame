import * as React from "react";
import {useSelector} from 'react-redux'

export interface CellProps {
    row: number;
    column: number;
    mainColor: string;
    currentValue: number;
    correctValue: number;
    focused: boolean;
    subGrid: number;
    firstValue: number;

    setCurrentCell(row: number, column: number): void;

}


let isHint = state => state.value.hint;
let isSecondColor = state => state.value.isSecondColor;
const isSolved = state => state.value.isSolved;


export function Cell({row, column, mainColor, currentValue, setCurrentCell, correctValue, focused, subGrid, firstValue}: CellProps) {


    let changeable = firstValue !== correctValue;

    const hint = useSelector(isHint);
    const solved = useSelector(isSolved);

    function onClickHandler(row: number, column: number): void {
        if (changeable) {
            setCurrentCell(row, column);
        }
    }

    let second = useSelector(isSecondColor);
    if (second) {
        mainColor = subGrid % 2 ? "white" : '#323232';
    }


    return (
        <td className="h"
            style={{
                color: solved ? "#929292" : (!changeable ? (second ? "#929292" : "#727272")
                    : (!hint ? (second ? (mainColor === 'white' ? "black" : "white") : "black") :
                        (currentValue == correctValue ? "green " : "red")))
            }}>
            <div className="cell"
                 style={{backgroundColor: focused ? "#45b6fe" : mainColor}}

                 onMouseOver={event => {
                     if (!focused && changeable && !solved)
                         event.currentTarget.style.backgroundColor = '#696969';
                 }}

                 onMouseLeave={event => {
                     if (!focused || event.currentTarget.style.backgroundColor === '#696969')
                         event.currentTarget.style.backgroundColor = mainColor;
                 }}

                 onClick={event => {
                     if (changeable && !solved) {
                         event.currentTarget.style.backgroundColor = "#45b6fe";
                         onClickHandler(row, column);
                     }
                 }}
            >{currentValue ? currentValue : ''}
            </div>

        </td>);
}