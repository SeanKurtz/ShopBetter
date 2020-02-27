/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Card from './Card';

class CardGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards
    };
    console.log(props.cards);
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="cards">
        {cards.map(card => (
          <Card title={card.title} description={card.description} key={card.id} />
        ))}
      </div>
    );
  }
}

export default CardGrid;
