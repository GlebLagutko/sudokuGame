import * as React from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {UPDATE_TIME} from "../store/actions/UpdateTime";
import {saveState} from "../store";


let isSolved = state => state.value.isSolved;
let isStarted = state => state.value.startTimer;

export function format(value: number): string {
    return value > 9 ? `${value}` : `0${value}`;
}

export function Timer() {


    const [seconds, setSeconds] = useState(+localStorage.getItem('time') || 0);

    const solved = useSelector(isSolved);

    const startTimer = useSelector(isStarted);


    const dispatch = useDispatch();

    setTimeout(() => {
        console.log(solved)

        if (solved) {
            let curSec: number = 0;
            setSeconds(curSec);
            localStorage.setItem('time', JSON.stringify(curSec));
        } else {
            if (startTimer) {
                let curSec: number = seconds + 1;

                setSeconds(curSec);
                localStorage.setItem('time', JSON.stringify(curSec));
                dispatch({type: UPDATE_TIME, value: curSec})
            } else {

                let curSec: number = 0;
                setSeconds(curSec);
                localStorage.setItem('time', JSON.stringify(curSec));
            }

        }
        saveState();
    }, 1000);


    let secondsString: string = format(seconds % 60);
    let minutesString: string = format(Math.floor(seconds / 60));

    return (<div className="timer">
        {minutesString}:{secondsString}
    </div>)
}