import {ButtonNumber} from "../ButtonNumber";
import React from "react";
import {NewGameButton} from "../NewGameButton";
import {ButtonClear} from "../ButtonClear";
import {ButtonAutoSolution} from "../ButtonAutoSolution";

export interface ButtonGroupProps {
    buttonHandler(value: number): void;
}

export function ButtonGroup({buttonHandler}: ButtonGroupProps) {
    return (<div>
        <NewGameButton/>
        <div className="btn-group-vertical mt-4 w-100" role="group">
            <div className="btn-group">
                <ButtonNumber clickHandler={buttonHandler} value={1}/>
                <ButtonNumber clickHandler={buttonHandler} value={2}/>
                <ButtonNumber clickHandler={buttonHandler} value={3}/>
            </div>
            <div className="btn-group">
                <ButtonNumber clickHandler={buttonHandler} value={4}/>
                <ButtonNumber clickHandler={buttonHandler} value={5}/>
                <ButtonNumber clickHandler={buttonHandler} value={6}/>
            </div>
            <div className="btn-group">
                <ButtonNumber clickHandler={buttonHandler} value={7}/>
                <ButtonNumber clickHandler={buttonHandler} value={8}/>
                <ButtonNumber clickHandler={buttonHandler} value={9}/>
            </div>
            <div className="btn-group">
                <ButtonClear/>
                <ButtonAutoSolution/>
            </div>
        </div>

    </div>)
}