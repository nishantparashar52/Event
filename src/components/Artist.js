import React, { useState, useRef } from 'react';
import Listing from './Listing/Listing';
import SearchBox from './SearchBox/SearchBox';
import Filters from './Filters/Filters';
import tentative from './../data/tentative.json';
import './Artist.scss';

import data from './../data/Data.json';

const Artist = () => {
  const [count, setCount] = useState(1);
  const [filter, isFilteredData] = useState(false);
  const searchBox = useRef('');
  function filterData() {
    const searchValue = searchBox.current.value.toLowerCase();
    const filterResult = data.equipments.filter(item => item.text.toLowerCase().indexOf(searchValue) > -1);
    if (filterResult.length) isFilteredData(filterResult);
  }
  return (
    <div>
      <SearchBox filterData={filterData} ref={searchBox} placeholder="Search Artist" />
      <Filters data={tentative.artist} filterApply={data => isFilteredData(tentative.artist[data])} />
      <div style={{ marginTop: '20px' }}>
        <div className="text-center mt-2"><span className="section-title">BOOK AN ARTIST </span><div className="mt-1 sub-text">book band , DJ, COMEDIAN,  SINGER , HIRE MAGICIAN, MOTIVATIONAL SPEAKER, POET ETC FOR ANY EVENT ACROSS THE WORLD..</div></div>
        <Listing data={filter || data.artist.slice(0, count * 20)} />
        <div className="mr-auto text-center">
          <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => setCount(prevCount => prevCount + 1)}>See More</button>
        </div>
      </div>
    </div>
  );
};
export default Artist;
