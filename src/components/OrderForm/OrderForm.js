import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = (event) => {
    event.preventDefault()
    this.setState({ name: event.target.value })
  }

  handleIngredientChange = (event) => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, event.target.value]})
  }


  submitOrder = (order) => {
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .catch(err => console.log('ERROR'))
  }

  handleSubmit = e => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }
    this.submitOrder(order)
    this.props.changeState()
    this.clearInputs();

  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className={ingredient} key={ingredient} value={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });



    return (
      <form className="order-form">
        <input
          className='name-input'
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className="submit-btn" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
