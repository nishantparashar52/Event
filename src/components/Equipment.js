import React, { useState, useRef, useReducer } from 'react';
import Listing from './Listing/Listing';
import SearchBox from './SearchBox/SearchBox';
import data from './../data/Data.json';
import tentative from './../data/tentative.json';
import Filters from './Filters/Filters';

function Equipment() {
  const [count, setCount] = useState(1);
  const [filter, isFilteredData] = useState(false);
  const searchBox = useRef('');
  function filterData () {
    const searchValue = searchBox.current.value.toLowerCase();
    const filterResult = data.equipments.filter(item => item.text.toLowerCase().indexOf(searchValue) > -1);
    if(filterResult.length) isFilteredData(filterResult);
  }
  return (
    <section className="pd-1 pt-1">
      <SearchBox filterData={filterData} ref={searchBox}  placeholder="Search Equipment"/>
      <Filters data={tentative.equipments} filterApply={data => isFilteredData(tentative.equipments[data])} />
      <Listing data={filter || data.equipments.slice(0, count * 20)} isFilteredData={isFilteredData} />
      {!filter && <div className="mr-auto text-center">
        <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => setCount(prevCount => prevCount + 1)}>See More</button>
      </div>}
    </section>
  );
}
export default Equipment;

