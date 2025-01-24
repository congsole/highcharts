"use client";

import React from 'react';
import NegativeStack from "@app/charts/demo/component/NegativeStack";
import FluctuationFactor from "@app/charts/demo/component/FluctuationFactor";


export default function Page() {

    return (
        <div>
            <NegativeStack />
            <br/>
            <FluctuationFactor />
        </div>
    );
};
