"use client";

import React from 'react';
import SeoulMap from "./_components/SeoulMap";
import PhonePrice from "./_components/PhonePrice";

export default function Page() {

    return (
        <>
            <h1>highcharts</h1>
            <div id={"container"}>
                <SeoulMap/>
                <PhonePrice />
            </div>
        </>
    );
};
