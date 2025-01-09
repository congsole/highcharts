"use client";

import React from 'react';

import DataGrid from "@highcharts/dashboards/datagrid";

import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";


const VariationFactors: React.FC = () => {

    React.useEffect(() => {
        DataGrid.dataGrid('arpu-datagrid', config);
    } , []);

    const config: DataGrid.Options = {
        dataTable: {
            columns: {
                NO: [1, 2, 3, 4, 5],
                '지역 및 유형': [
                    '수도권 / 강서마케팅팀 / 도매 / MNP / 지원금약정',
                    '수도권 / 강서마케팅팀 / 도매 / MNP / 지원금약정',
                    '수도권 / 강서마케팅팀 / 도매 / MNP / 지원금약정',
                    '수도권 / 강서마케팅팀 / 도매 / MNP / 지원금약정',
                    '수도권 / 강서마케팅팀 / 도매 / MNP / 지원금약정',
                ],
                '매출비용': [10000, 20000, 30000, 40000, 50000,],
                '변동율': [36.8, 36.8, 36.8, 36.8, 36.8],
            }
        }
    };

    return (
        <Cell className="chart" id="arpu-variation-factor-wrapper">
            <Row>
                <p className="highcharts-title">유치ARPU 변동요인</p>
            </Row>
            <Row>
                <div
                    id="arpu-datagrid"
                    style={{ width: '500px' }}
                />
            </Row>
            <Row>
                <div className="highcharts-background">
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>
            </Row>
        </Cell>
    );
}

export default VariationFactors;
