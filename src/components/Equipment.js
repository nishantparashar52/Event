import React from 'react';
import Listing from './Listing/Listing';
import data from './../data/Data.json';

const Equipment = () => {
    return (
      <section style={{background: '#f3f3f3', padding: '10px 0px'}}>
    <div className="container">
      <form className="find-course__form" id="artist_search" style={{backgroundColor:'transparent'}}>
        <div className="row">
          <div className="col-md-6 min offset-md-1">
            <input type="text" className="form-control minimal spic min2" name="master_search" placeholder="Search Equipment" style={{height: '42px'}} /></div>
         
          <div className="col-md-2 min">
            <button className="btn btn-info btn-effect spic" name="search" style={{width:'100%', height: '42px'}} id="Artistsearch">SEARCH HERE</button>
          </div>
          
          <div className="col-md-3 min">
            <a href="https://hire4event.com/hire4event-Brochure-40.pdf" className="btn btn-info btn-effect spic" name="search" style={{width:'100%', height: '42px'}} id="Artistsearch">DOWNLOAD  CATALOG</a>
          </div>
        </div>
      </form>
    </div>
    <Listing data={data.equipments} />
  </section>
  );
}

export default Equipment;
