import React, { Component } from 'react';

class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            randomNumber: Math.floor(Math.random() *100) + 1 + "",
            guesses: "",
            lastResult: "",
            lowOrHi: "",
            guessCount: 1,
            classLastResult: "",
            classButtonNewGame: 'd-none'
        };

        this.checkGuess = this.checkGuess.bind(this);
    }

    componentDidMount(){
        this.guessNumber.focus();
    }

    componentDidUpdate(){
        if(this.state.classButtonNewGame === "newGameBtn"){
            this.startNewGame.focus();
        }
    }

    checkGuess(event){
        event.preventDefault();
        let guessValue = event.target.guessNumber.value;
        let randomValue = this.state.randomNumber;
        event.target.guessNumber.value = "";

        if(guessValue !== "") {
            this.setState((prevState) => ({
                guesses: prevState.guesses === "" ? `Previous guesses: ${guessValue}` : `${prevState.guesses}, ${guessValue}`,
                guessCount: prevState.guessCount + 1
            }));
            if (guessValue === randomValue) {
                this.setState({
                    lastResult: "Congratulations! You got it right!",
                    lowOrHi: "",
                    classLastResult: "bg-success",
                    classButtonNewGame: "newGameBtn"
                });
                //if the game is over, we want to deactivate the submit guess button
                this.submitGuess.setAttribute("disabled", "disabled");
                this.guessNumber.setAttribute("disabled", "disabled");

            } else if (this.state.guessCount === 10) {
                this.setState({
                    lastResult: "GAME OVER!",
                    lowOrHi: "",
                    classLastResult: "bg-danger",
                    classButtonNewGame: "newGameBtn"
                });

                this.submitGuess.setAttribute("disabled", "disabled");
                this.guessNumber.setAttribute("disabled", "disabled");


            } else if (guessValue > randomValue) {
                this.setState({
                    lastResult: "Wrong!",
                    lowOrHi: "Last guess was too high!",
                    classLastResult: "bg-danger"
                });
            } else if (guessValue < randomValue) {
                this.setState({
                    lastResult: "Wrong!",
                    lowOrHi: "Last guess was too low!",
                    classLastResult: "bg-danger"
                })
            }

        }
    }

    render(){
        return(
            <div>
                <form className="form-inline" onSubmit={this.checkGuess}>
                        <label className="m-2">Enter a guess:</label>
                        <input name="guessNumber" type="number" min="1" max="100" ref={(input) => {this.guessNumber = input;}} className="form-control m-2"/>
                        <button type="submit" ref={(button) => {this.submitGuess = button;}} className="submitBtn">Submit guess</button>
                </form>
                <div>
                    <p className="m-2">{this.state.guesses}</p>
                    <p className={this.state.classLastResult}>{this.state.lastResult}</p>
                    <p className="m-2">{this.state.lowOrHi}</p>
                    <button ref={(button) => {this.startNewGame = button;}} className={this.state.classButtonNewGame} onClick={this.props.newGame}>Start new game</button>
                </div>
            </div>
        );
    }
}

export default Game;