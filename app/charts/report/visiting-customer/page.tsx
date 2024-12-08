"use client";

import React from 'react';
import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";
import Analysis from "../visiting-customer/component/Analysis";
// import Type from "../visiting-customer/component/Type";


export default function Page() {

    return (
        <>
            <div id={"container"}>
                <Row><h2 className="highcharts-dashboards-component-title">내방고객</h2></Row>
                <Row>
                    <Cell width="800px"><Analysis /></Cell>
                    {/*<Cell width="800px"><Type /></Cell>*/}
                </Row>
            </div>
        </>
    );
};
