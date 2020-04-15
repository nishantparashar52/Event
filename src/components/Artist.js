import React, {useState} from 'react';
import Search from './Search/Search';
import Listing from './Listing/Listing';
// import Cards from './Cards/Cards';
import './Artist.scss';

import data from './../data/Data.json';

const Artist = () => {
  const [count, setCount] = useState(1);
  return (
    <div>
      <Search />
      <div style={{marginTop: '20px'}}>
      <div class="text-center mt-2"><span className="section-title">BOOK AN ARTIST </span><div className="mt-1 sub-text">book band , DJ, COMEDIAN,  SINGER , HIRE MAGICIAN, MOTIVATIONAL SPEAKER, POET ETC FOR ANY EVENT ACROSS THE WORLD..</div></div>
        <Listing data={data.artist.slice(0, count * 20)} />
        <div className="mr-auto text-center">
          <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => setCount(prevCount => prevCount + 1)}>See More</button>
        </div>
        {/* <Cards /> */}
      </div>
    </div>
  );
};
export default Artist;
