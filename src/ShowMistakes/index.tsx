import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {CHANGE_HINT} from "../store/actions/ChangeHint";
import {saveState} from "../store";

const isChecked = state => state.value.hint;

export function ShowMistakes() {

    const dispatch = useDispatch();
    let checked = useSelector(isChecked);

    return (
        <div>
            <input onClick={() => {

                dispatch({type: CHANGE_HINT, value: !checked});
                saveState();
            }}
                   className="form-check-input" type="checkbox" checked={checked}
                   id="flexCheckDefault"/>
            <div className="form-check-label">
                Show mistakes
            </div>
        </div>
    )

}