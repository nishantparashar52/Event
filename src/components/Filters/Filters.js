import React from 'react';
import './Filters.scss';

function Filters ({ data, filterApply }) {
    
    return (
        <div className="filter-wrapper">
            {Object.keys(data).map((item,index) =>
            <div className="checkbox checkbox-primary" key={index} onClick={() => filterApply(item)}>
                <input type="checkbox" id={`defaultInline${index}`} />
            <label htmlFor={`defaultInline${index}`}>{item.replace('_', ' ')}</label>
          </div>
            )}
        </div>
    );
}
export default Filters;
