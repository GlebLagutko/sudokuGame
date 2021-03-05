import React from 'react';
import './App.css';
import {Sudoku} from "./Sudoku";
import {ButtonGroup} from "./ButtonGroup";
import {Timer} from "./Timer";
import {SelectDifficulty} from "./SelectDifficulty";
import {ShowMistakes} from "./ShowMistakes";
import {ChangeColorButton} from "./ChangeColorButton";
import {EndGameModal} from "./EndGameModal";
import Player from "./PLayer";
import TableOfResults from "./TableOfResults";
import {Footer} from "./Footer";


function App() {

    function buttonHandler() {

    }

    return (<div className="main-div">
            <div className="App container-fluid">
                <div className="container">

                    <div className="row mt-4 ml-xl-4">
                        <div className="w-50 pl-xl-5">
                            <SelectDifficulty/>
                        </div>
                        <div className="w-25">
                            <ChangeColorButton/>
                            <ShowMistakes/>
                        </div>

                        <div className="w-25">
                            <Timer/>
                        </div>
                    </div>


                    <div className="row mb-4">
                        <div id='sudoku' className="col-12 col-md-8 col-lg-6 col-xl-6 mt-4">
                            <div className="float-right">
                                <Sudoku/>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-6 col-xl-3 mt-4">
                            <ButtonGroup buttonHandler={buttonHandler}/>

                            <Player/>
                        </div>
                        <div className="col-12 col-md-12 col-lg-12 col-xl-3 mt-4">
                            <TableOfResults/>
                        </div>
                    </div>
                    <EndGameModal/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
