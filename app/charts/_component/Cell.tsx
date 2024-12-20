import * as React from 'react';

export default function Cell(props) {
    return <div className={'cell' + (` ${props.className}` || '')} id={props.id}>
        {props.children}
    </div>;
}
