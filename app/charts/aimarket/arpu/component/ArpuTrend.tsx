"use client";

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
import HighchartsMore from 'highcharts/highcharts-more';
import Treemap from 'highcharts/modules/treemap';
import Row from '@app/charts/_component/Row';

interface TrendItem {
    day: string;
    value: number;
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const trendData: TrendItem[] = [
    {day:"2024-09-01 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-02 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-03 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-04 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-05 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-06 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-07 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-08 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-09 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-10 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-11 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-12 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-13 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-14 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-15 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-16 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-17 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-18 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-19 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-20 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-21 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-22 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-23 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-24 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-25 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-26 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-27 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-28 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-29 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-09-30 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-01 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-02 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-03 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-04 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-05 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-06 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-07 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-08 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-09 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-10 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-11 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-12 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-13 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-14 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-15 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-16 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-17 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-18 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-19 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-20 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-21 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-22 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-23 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-24 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-25 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-26 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-27 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-28 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-29 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-30 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-10-31 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-01 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-02 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-03 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-04 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-05 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-06 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-07 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-08 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-09 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-10 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-11 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-12 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-13 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-14 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-15 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-16 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-17 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-18 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-19 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-20 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-21 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-22 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-23 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-24 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-25 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-26 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-27 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-28 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-29 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-11-30 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-12-01 오전 12:00:00",value: getRandomNumber(67700, 55000),},
    {day:"2024-12-02 오전 12:00:00",value: getRandomNumber(67700, 55000),},

];

const ArpuTrend: React.FC = () => {
    // Highcharts More 모듈 초기화
    if (typeof Highcharts === 'object') {
        HighchartsMore(Highcharts);
        HighchartsExporting(Highcharts);
        Treemap(Highcharts);
    }

    const chartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
            zooming: {
                type: 'x',
            },
        },
        title: {
            text: 'ARPU Trend',
            align: "left",
        },
        tooltip: {
            pointFormat: '평균 ARPU: <b>{point.y}</b>'
        },
        xAxis: {
            categories: trendData.map(({ day }) => {
                return day;
            }),
            labels: {
                enabled: false,
            },
            currentDateIndicator: true,
            visible: false,
        },
        yAxis: {
            title: {
                text: null,
            },
            labels: {
                enabled: true,
            },
            endOnTick: true,
            startOnTick: true,
            tickInterval: 10000,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
            }
        },
        series: [{
            type: 'line',
            name: 'ARPU Trend (월별)',
            data: trendData.map((item) => { return item.value; }),
        }]
    };

    return (
        <Row className="chart">
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
        </Row>
    );
}

export default ArpuTrend;
