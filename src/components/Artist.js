import React from 'react';
import Search from './Search/Search';
import Cards from './Cards/Cards';

const Artist = () => {
  return (
    <div>
      <Search />
      <div style={{marginTop: '20px'}}>
        <Cards />
      </div>
    </div>
  );
};
export default Artist;
