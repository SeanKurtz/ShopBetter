import React from 'react';
import CardGrid from '../components/CardGrid';
import cards from '../data/cards';


const Dashboard = () => (
  <main>
    <CardGrid cards={cards} />
  </main>
);

export default Dashboard;
