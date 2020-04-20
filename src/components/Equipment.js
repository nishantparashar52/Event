import React, { useState } from 'react';
import Listing from './Listing/Listing';
import data from './../data/Data.json';
import tentative from './../data/tentative.json';
import Filters from './Filters/Filters';
import { debounce } from '../helper';

const Equipment = () => {
  const [count, setCount] = useState(1);
  const [filter, isFilteredData] = useState(false);
  return (
    <section style={{ background: '#f3f3f3', padding: '10px 0px' }}>
      <div className="container">
        <form className="find-course__form" id="artist_search" style={{ backgroundColor: 'transparent' }}>
          <div className="row">
            <div className="col-md-6 min offset-md-1">
              <input type="text" className="form-control minimal spic min2" name="master_search" placeholder="Search Equipment" style={{ height: '42px' }} /></div> { /* onKeyUp={debounce(filterData, 300)} */}
            <div className="col-md-2 min">
              <button className="btn btn-info btn-effect spic" name="search" style={{ width: '100%', height: '42px' }} id="Artistsearch">SEARCH HERE</button>
            </div>
          </div>
        </form>
      </div>
      <Filters data={tentative.equipments} FilterApply={data => isFilteredData(tentative.equipments[data])} />
      <Listing data={filter || data.equipments.slice(0, count * 20)} isFilteredData={isFilteredData} />
      {!filter && <div className="mr-auto text-center">
        <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => setCount(prevCount => prevCount + 1)}>See More</button>}
      </div>}
    </section>
  );
}

export default Equipment;
