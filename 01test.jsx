import React from 'react';
import ReactDOM from 'react-dom';
import body from './body.js';
import fruits from './fruits.js';
import Card from './apptest.jsx';

const numberOfCards = [2,8,18];


export class GameController extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            level:0
        }
        this.winALevel = this.winALevel.bind(this)
    }
     winALevel(){
        this.setState(prevState  => ({
            level: prevState.level + 1
        }))
    }


    render(){
        
        var numberOfCardsinLevel = numberOfCards[this.state.level];

        return <Game cards = {this.props.cards} numberOfCardsinLevel = {numberOfCardsinLevel} winALevel = {this.winALevel} />
    }
}



class Game extends React.Component{
    constructor(props){
        super(props);

        console.log('Game created')
        this.state = {
           checked : [],
           isMatched : false,
           gameGrid: null,
        }
  }

  initialiseGame() {
            this.score = 0;

        let randomNumbers=[];

            //wylosowanie liczb
            for (var i=0; i < this.props.numberOfCardsinLevel; i++){

            let randomNumber = Math.floor(Math.random()*this.props.cards.length);

                if (randomNumbers.indexOf(randomNumber) == -1){
                    randomNumbers.push(randomNumber);
                }
                else {
                i = i-1;
                }
            }

        

        //podwojenie kart
        const gameGrid = [...randomNumbers,...randomNumbers].map(id => ({ imageId: id, isRemoved: false}))
        console.log(gameGrid);

        //wymieszanie
        gameGrid.sort(() => 0.5 - Math.random());
        console.log(gameGrid);

        this.setState({gameGrid: gameGrid});
  }
        

    render(){
        if(this.state.gameGrid === null)
            return null;

               const cards = this.state.gameGrid.map((item,index) =>
        <Card card={this.props.cards[item.imageId]} 
            key={index} 
            isRemoved={item.isRemoved} 
            isOpen={this.state.checked.indexOf(index) > -1}
            onOpen={() => this.handleCardOpen(index)} />)
   
        let width = 170 * Math.sqrt(this.props.numberOfCardsinLevel*2)
        // const cards = this.props.cards.map(item =>
        //     <Card card={item} key={item.name}/>)
        return(
            <div className='game'>
            <h1>Wynik: {this.score}</h1>
            <div style={{display:'flex',flexWrap: 'wrap', width: width, textAlign:'center'}}>
                {cards}
            </div>
            </div>
        )
    }

    handleCardOpen(cardIndex) {

        //funkcja play audio
        var audio = new Audio();
        audio.src = this.props.cards.audio
        console.log(audio)
        console.log(this.props.cards.audio)
        // audio.play()
        this.setState(prevState => ({
            checked: prevState.checked.indexOf(cardIndex) > -1 ? prevState.checked : [...prevState.checked, cardIndex]
        }), () => {

            console.log('checked', this.state.checked);
            if(this.state.checked.length < 2)
                return;

            if(this.state.gameGrid[this.state.checked[0]].imageId === this.state.gameGrid[this.state.checked[1]].imageId) {
                console.log('Wygrana!');
                this.score++
                this.removeCards(this.state.checked);
                console.log(this.props.numberOfCardsinLevel)
                console.log(this.score)
                if (this.score === this.props.numberOfCardsinLevel){
                    console.log("jupi")
                    this.props.winALevel()
                }
            

            } else {
                setTimeout(() => this.setState({ checked: [] }), 1000);
                
                console.log('Przegrana');
            }
        });
            }

    removeCards(checked) {
        this.setState(prevState => ({
            gameGrid: prevState.gameGrid.map((el,i) => {
                if(checked.indexOf(i) > -1) {
                    el.isRemoved = true;
                }
                return el;
            }),
            checked: []
        }));
    }

    componentDidMount() {
        this.initialiseGame();
    }

    componentDidUpdate(prevProps){
        console.log("componentDidUpdate", prevProps, this.props)

        if(prevProps.numberOfCardsinLevel != this.props.numberOfCardsinLevel) {
            this.initialiseGame();
        }
    }
    
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(<div>
        <GameController cards={body} handleCheckCards={this.handleCheckCards} />
        </div>,
        
        document.getElementById('app')
    );
});