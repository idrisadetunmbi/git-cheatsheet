import React from 'react';

import Cheat from './Cheat';

export default ({ category }) => (
  <div className="category">
    <span className="category-title">{category.title}</span>
    <div className="category-cheat">
      {
        category.cheats.map(cheat => <Cheat key={cheat._id} cheat={cheat} />)
      }
    </div>
  </div>
);
