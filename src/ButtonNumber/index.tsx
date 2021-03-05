import React from "react";
import {useDispatch} from 'react-redux'
import {saveState} from "../store";
import {BUTTON_INPUT} from "../store/actions/ButtonInput";

export interface ButtonNumberProps {
    clickHandler(value: number): void;

    value: number;
}

export function ButtonNumber({clickHandler, value}: ButtonNumberProps) {

    const dispatch = useDispatch();

    return (<button type="button" className="btn btn-outline-secondary py-3 btn-num"
                    onClick={() => {
                        dispatch({type: BUTTON_INPUT, value: value});
                        saveState();

                    }} onKeyPress={() => {
    }}>{value}
    </button>)
}