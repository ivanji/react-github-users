import React from 'react';
import Card from './card';

const Cardlist =(props) => {
    return(
        <div className="row">
            {
                props.cards.map(card => {return <Card key={card.id} {...card} />})
            }
        </div>
    )
};

export default Cardlist;