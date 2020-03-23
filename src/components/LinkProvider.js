import React from 'react';
import { isRelativeUrl, isObject } from '../helper';
import { Link } from 'react-router-dom';

const LinkProvider = props => {
    const { to: link, children } = props;
    if (!link) {
        return (<div {...props}> {children} </div>);
    }
    let isValidLinkObj = false;
    if (link) {
        isValidLinkObj = isObject(link) || isRelativeUrl(link);
    }
    return (
        <React.Fragment>
            {isValidLinkObj ? <Link {...props}>{children}</Link> : <a href={link} {...props}>{children}</a>}
        </React.Fragment>
    );
};

export default LinkProvider;
