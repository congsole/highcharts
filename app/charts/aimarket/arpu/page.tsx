"use client";

import React from 'react';
import RangeRatio from "@app/charts/aimarket/arpu/component/RangeRatio";
import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";
import ArpuTrend from "@app/charts/aimarket/arpu/component/ArpuTrend";
import AttractArpu from "@app/charts/aimarket/arpu/component/AttractArpu";
import ArpuAnalysis from "@app/charts/aimarket/arpu/component/ArpuAnalysis";


export default function Page() {

    return (
        <>
            <div id={"container"}>
                <Row>
                    <Cell width="800px"><ArpuAnalysis /></Cell>
                    <Cell>
                        <Row><ArpuTrend /></Row>
                        <Row><AttractArpu /></Row>
                        <Row><RangeRatio /></Row>
                    </Cell>
                    <Cell><RangeRatio /></Cell>
                </Row>
            </div>
        </>
    );
};
