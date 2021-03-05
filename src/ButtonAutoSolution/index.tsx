import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {CHANGE_AUTO_SOLUTION} from "../store/actions/ChangeAutoSolution";
import {saveState} from "../store";


const isAuto = state => state.value.autoSolution;

export function ButtonAutoSolution() {


    const autosolution = useSelector(isAuto);

    const dispatch = useDispatch();

    return (<button type="button" className="btn btn-outline-secondary py-3 btn-fn" onClick={() => {
                dispatch({type: CHANGE_AUTO_SOLUTION, value: true});
                saveState();
        }} style={{backgroundColor: autosolution ? '#6c757d' : "", color: autosolution ? "white" : ''}}> Auto play
        </button>
    )
}