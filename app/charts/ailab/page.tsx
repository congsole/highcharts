"use client";

import React from 'react';
import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";
import Arpu from "@app/charts/ailab/component/Arpu";

export default function Page() {

    return (
        <>
            <div id={"container"}>
                <Row><h2 className="highcharts-dashboards-component-title"></h2></Row>
                <Row>
                    <Cell width="150px"><Arpu /></Cell>
                </Row>
            </div>
        </>
    );
};
