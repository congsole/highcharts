"use client";

import React from 'react';
import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";
import Analysis from "@app/charts/report/store-summary/component/Analysis";

export default function Page() {

    return (
        <>
            <div id={"container"}>
                <Row><h2 className="highcharts-dashboards-component-title">매장 SUMMARY</h2></Row>
                <Row>
                    <Cell width="150px"><Analysis /></Cell>
                </Row>
            </div>
        </>
    );
};
