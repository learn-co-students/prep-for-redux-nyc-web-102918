import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux'

const reducer = (prevState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return prevState + 1
		case 'DECREMENT':
			return prevState - 1
		default:
			return 0
	}
}

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Counter renderDOM={this.props.renderDOM}/>
      </div>
    );
  }
}

class Header extends Component {
	renderDescription = () => {
		const remainder = store.getState() % 5;
		const upToNext = 5 - remainder;
		return `The current count is less than ${store.getState() + upToNext}`;
	};
	
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">{this.renderDescription()}</h1>
      </header>
    );
  }
}

class Counter extends Component {



  increment = () => {
    store.dispatch({type: 'INCREMENT'})
		this.props.renderDOM()
  };

  decrement = () => {
    store.dispatch({type: 'DECREMENT'})
		this.props.renderDOM()
  };

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState()}</h1>
        <button onClick={this.decrement}> - </button>
        <button onClick={this.increment}> + </button>
      </div>
    );
  }
}

const renderDOM = () => ReactDOM.render(<App renderDOM={renderDOM}/>, document.getElementById('root'));
renderDOM()
