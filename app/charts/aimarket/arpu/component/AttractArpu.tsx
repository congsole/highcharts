"use client";

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});

import Cell from '@app/charts/_component/Cell';
import Row from '@app/charts/_component/Row';

import { Select } from "antd";

const selectItems = [
    {
        value: "channel",
        label: "채널",
    },
    {
        value: "maker",
        label: "제조사",
    },
    {
        value: "priceRange",
        label: "가격대",
    },
];

const dataMap: Map<string, Array<{name: string, value: number}>> = new Map();

dataMap.set('channel', [
    { name: '대형특수', value: 69391, },
    { name: '비즈', value: 67429, },
    { name: '도매', value: 62786, },
    { name: '소매', value: 59435, },
    { name: '특판', value: 58295, },
    { name: 'T world Direct', value: 47766, },
    { name: '방판', value: 37729, },
    { name: '온라인', value: 35025, },
]);
dataMap.set('maker',[
    { name: '애플', value: 63916, },
    { name: '삼성', value: 62816, },
    { name: '기타', value: 28091, },
]);
dataMap.set('priceRange', [
    { name: '플래그쉽', value: 76230, },
    { name: '고가', value: 54280, },
    { name: '중가', value: 41373, },
    { name: '저가', value: 30636, },
]);

const AttractArpu: React.FC = () => {

    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts);
    }

    const [type, setType] = React.useState(selectItems[0].value);

    const chartOptions: Highcharts.Options = {
        chart: {
            type: 'bar',
            width: 400,
            height: 270,
        },
        title: {
            text: '유치 ARPU',
            align: "left",
        },
        xAxis: {
            categories: (dataMap.get(type) ?? []).map((item) => item.name),
        },
        yAxis: {
            title: {
                text: null,
            },
        },
        legend: {
            enabled: false,
        },
        // tooltip: {
        //     pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        // },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
            }
        },
        series: [{
            name: type,
            type: 'bar',
            data: (dataMap.get(type) ?? []).map((item) => item.value),
        }]
    };

    return (
        <Cell className="chart">
            <Row>
                <Select
                    defaultValue={selectItems[0].value}
                    options={selectItems}
                    onChange={(value: string) => {
                        setType(value);
                    }}
                    style={{width: '250px', marginBottom: '20px'}}
                />
            </Row>
            <Row>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    style={{ width: '100%' }}
                />
            </Row>
        </Cell>
    );
}

export default AttractArpu;
