import React from 'react';
import './Search.scss';
const Search = props => {
    const labelHeader = 'Artist';
    return (
        <div className="search-container">
            <div className="search-block">
                <div className="search">
                    <label className="label">
                        <div className="">{labelHeader}</div>
                        <input type="text" className="search-text" />
                    </label>
                </div>
                <div className="space"></div>
                <div className="search">
                    <label className="label">
                        <div className="">{labelHeader}</div>
                        <input type="text" className="search-text" />
                    </label>
                </div>
            </div>
            <div className="button-section">
                <div className="btn">
                    <i className=""></i>
                    Search
                    </div>
            </div>
        </div>
    )
};
export default Search;
