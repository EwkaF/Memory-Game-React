import React from 'react';
import ReactDOM from 'react-dom';
import body from './body.js';
import fruits from './fruits.js';
import Card from './apptest.jsx';
import { GameController } from './01test.jsx';
import style from '../style.scss';

class App extends React.Component{
render(){
	return <FirstPage />
}
}


class FirstPage extends React.Component{
	constructor(props){
		super(props);
			this.state= {
				selectedCards: null
			}
		
	}

	handleOnClickFruits = () => {
		this.setState({selectedCards: fruits});
  	}
  	handleOnClickBody = () => {
		this.setState({selectedCards: body});
  	}
  // 	handleOnClickAnimals = () => {
		// this.setState({selectedCards: animals});
  // 	}


	render(){
		const cardsSelector = <div>
			<h2>Choose the theme / Wybierz tematykę</h2>
			
			<button className='button' onClick={this.handleOnClickFruits}>Fruits & Vegetables / Owoce & warzywa</button>
			<button className='button'onClick={this.handleOnClickBody}>Body parts / Części ciała</button>
			<button className='button'onClick={this.handleOnClickAnimals}>Animals / Zwierzęta</button>
		</div>;

		const game = <GameController cards={this.state.selectedCards} />

		const display = this.state.selectedCards == null ? cardsSelector : game;	

		return(<div className = 'container'>
			<h1 id = 'memoryGame'><span>Memory </span>GAME</h1>
				{display}
			</div>
			);
	}
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(<div>
        <App   body={body} fruits={fruits} />
        </div>,
        
        document.getElementById('app')
    );
});
