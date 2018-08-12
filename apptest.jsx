import React from 'react';
import ReactDOM from 'react-dom';

module.exports = class Card extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isOff: false,
            isChecked: true,
            isMatched: this.props.isMatched
        }

    }


    componentWillReceiveProps(nextProps) {
    if (nextProps.isMatched == true) {
      this.setState({
        isMatched: true
      });
    }
  }
  
    render(){
        let divStyle ={};
        let textStyle ={};
        
    

        if (!this.state.isOpen){
            divStyle ={
                width:'160px',
                height: '160px',
                border:'2px solid orange',
                backgroundImage: "url(./img/spots.jpg)",
                backgroundSize: 'contain',
                backgroundRepeat:'no-repeat',
                margin: '4px'
            }
            textStyle = {display:'none'}
        }
        if (this.props.isOpen){
            divStyle ={
                width:'160px',
                height: '160px',
                border:'2px solid red',
                backgroundImage: "url("+this.props.card.src +')',
                // backgroundPosition: this.props.card.backgroundPosition,
                backgroundSize: 'contain',
                // width: this.props.card.width,
                // height: this.props.card.height,
                backgroundRepeat:'no-repeat',
                margin: '4px'
            }
            textStyle ={
            position:'relative',
            top: '120px',
            left:'40px'
        }
        }
        if (this.props.isRemoved){
            divStyle ={
                width:'160px',
                height: '160px',
                // border:'2px solid blue',
                backgroundColor: 'white',
                margin: '4px'
            }
            textStyle = {display:'none'}
        }


        return (<div onClick={this.props.onOpen}>
            <div style={divStyle}>
            <audio>
            <source src = {this.props.card.audio}></source>
            </audio>

            <h3 style={textStyle}>{this.props.card.name} </h3>
            </div>

        </div>);
    }
}

// const images =  {name:'blueshell',
//      src:'./img/blueshell.png'};


// document.addEventListener('DOMContentLoaded', function(){
//     ReactDOM.render(
//         <Card blueshell = {images}/>,
//         document.getElementById('app')
//     );
// });;