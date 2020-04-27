import React from 'react';
import { debounce } from '../../helper';
import './SearchBox.scss';
const SearchBox = React.forwardRef((props, ref) => {
    const { filterData, placeholder } = props;
    return (
        <form className="form-inline md-form mr-auto mb-4">
            <input className="form-control mr-sm-2 col-lg-6 custom-input" ref={ref} type="text" placeholder={placeholder} aria-label="Search" onKeyUp={debounce(filterData, 500)} />
            <button className="btn blue-gradient btn-md my-0 btn-rounded col-lg-1" type="submit" onClick={filterData}>Search</button>
        </form>
    );
});

export default SearchBox;