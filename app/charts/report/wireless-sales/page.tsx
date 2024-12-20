"use client";

import React from 'react';
import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";
import Sales from "@app/charts/report/wireless-sales/component/Sales";


export default function Page() {

    return (
        <>
            <div id={"container"}>
                <Row><h2 className="highcharts-dashboards-component-title">무선판매</h2></Row>
                <Row>
                    <Cell width="800px"><Sales /></Cell>
                </Row>
            </div>
        </>
    );
};
