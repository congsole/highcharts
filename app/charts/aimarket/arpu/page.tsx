"use client";

import React from 'react';
import RangeRatio from "@app/charts/aimarket/arpu/component/RangeRatio";
import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";
import ArpuTrend from "@app/charts/aimarket/arpu/component/ArpuTrend";
import AttractArpu from "@app/charts/aimarket/arpu/component/AttractArpu";
import ArpuAnalysis from "@app/charts/aimarket/arpu/component/ArpuAnalysis";
import VariationFactors from "@app/charts/aimarket/arpu/component/VariationFactors";


export default function Page() {

    return (
        <>
            <div id={"container"}>
                <Row className="report-container-title">유치ARPU</Row>
                <Row>
                    <Cell><ArpuAnalysis /></Cell>
                    <Cell>
                        <Row ><ArpuTrend /></Row>
                        <Row><AttractArpu /></Row>
                        <Row><RangeRatio /></Row>
                    </Cell>
                    <Cell><VariationFactors /></Cell>
                </Row>
            </div>
        </>
    );
};
