import React from 'react';
import './Filters.scss';

const Filters = props => {
    const { data, FilterApply } = props;
    return (
        <div className="filter-wrapper">
            {Object.keys(data).map(item => <div className="filters" onClick={() => FilterApply(item)}>{item.replace('_', ' ')}</div>)}
        </div>
    );
}
export default Filters;
