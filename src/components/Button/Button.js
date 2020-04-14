import React, { useState } from 'react';
export default Button = React(props => {
    const { btn, callBack, className } =  props;
    return (<Button className={className} onClick={callBack}>{props}</Button>);
});