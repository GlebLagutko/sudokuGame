import * as React from "react";

import {useDispatch, useSelector} from 'react-redux'
import {CHANGE_DIFFICULTY} from "../store/actions/ChangeDifficulty";
import {START_GAME} from "../store/actions/StartGame";
import {saveState} from "../store";

const difficultyState = state => state.value.difficulty;

export function SelectDifficulty() {
    const dispatch = useDispatch();
    const difficulty: string = useSelector(difficultyState);

    const changeDifficulty = (difficulty: String) => {

        dispatch({type: CHANGE_DIFFICULTY, value: difficulty});

        setTimeout(() => {
            dispatch({type: START_GAME, value: false});
            saveState();
        }, 100)
    };

    return (<div>
            <div className="col-md-4">
                <span className="float-left pr-2 align-middle">Difficulty:</span><br></br>
                <div className="dropdown show float-left">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                       id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {difficulty}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a onClick={() => {
                            changeDifficulty("EASY");
                        }} className="dropdown-item"
                           href="#">Easy</a>
                        <a onClick={() => {
                            changeDifficulty("MEDIUM");
                        }}
                           className="dropdown-item" href="#">Medium</a>
                        <a onClick={() => {
                            changeDifficulty("HARD");
                        }} className="dropdown-item"
                           href="#">Hard</a>
                    </div>
                </div>
            </div>
        </div>
    );
}