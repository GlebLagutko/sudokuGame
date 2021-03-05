import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {saveState} from "../store";
import {CHANGE_COLOR} from "../store/actions/ChangeColor";

const isSecond = state => state.value.isSecondColor;

export function ChangeColorButton() {

    const dispatch = useDispatch();
    let second = useSelector(isSecond);

    return (
        <div>
            <input onClick={() => {
                dispatch({type: CHANGE_COLOR, value: !second});
                saveState();
            }}
                   className="form-check-input" type="checkbox" checked={second}
                   id="flexCheckDefault"/>
            <div className="form-check-label">
                Second color pallet
            </div>
        </div>
    )

}