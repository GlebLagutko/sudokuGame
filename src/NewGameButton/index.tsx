import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {saveState} from "../store";
import {START_GAME} from "../store/actions/StartGame";
import {CHANGE_AUTO_SOLUTION} from "../store/actions/ChangeAutoSolution";


export function NewGameButton({}) {

    const dispatch = useDispatch();


    return (<button type="button" className="w-100 btn btn-outline-primary"
                    onClick={() => {
                        dispatch({type: CHANGE_AUTO_SOLUTION, value: false});

                        setTimeout(() => {
                            dispatch({type: START_GAME, value: false});
                            saveState();
                        }, 100)
                    }}>New Game</button>
    )
}