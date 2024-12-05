import * as React from 'react';

export default function Cell(props) {
    console.log(props.width);
    return <div className={'cell' + (` ${props.className}` || '')} id={props.id} style={{ width: `${props.width} !important` }}>
        {props.children}
    </div>;
}
