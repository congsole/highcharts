"use client";

import React from 'react';
import RbSum from "@app/charts/aimarket/rb/component/RbSum";


export default function Page() {

    return (
        <>
            <h1>highcharts</h1>
            <div id={"container"}>
                <RbSum/>
            </div>
        </>
    );
};
