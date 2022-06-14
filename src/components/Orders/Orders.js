import React from 'react';
import './Orders.css';

function Orders({ orders })  {
  if (orders) {
  const orderEls = orders.map((order) => {
    return (
      <div key={order.id} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}
}

export default Orders;
