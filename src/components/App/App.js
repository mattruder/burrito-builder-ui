import React, { Component } from 'react';
import './App.css';
// import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: '',
      changed: 1
    }

    this.changeState = this.changeState.bind(this)

  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(data => this.setState({ orders: data.orders }))
      .catch(err => console.log('Error fetching:', err))
  }

  componentDidUpdate = (prevState) => {
    if(prevState.changed !== this.state.changed) {
    fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(data => this.setState({ orders: data.orders }))
      .catch(err => console.log('Error fetching:', err))
      }
  }

  changeState = () => {
    this.setState( prevState => ({ changed: prevState.changed + 1 }))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm orders={this.state.orders} changeState={() => this.changeState}/>
        </header>
        {this.state.orders && <Orders orders={this.state.orders} />}
      </main>
    );
  }
}


export default App;
