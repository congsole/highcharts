"use client";

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
import {Row, Select} from "antd";

const selectItems = [
    {
        value: "pie",
        label: "파이차트",
    },
    {
        value: "bar",
        label: "막대그래프",
    },
];

const RangeRatio: React.FC = () => {

    const [chartType, setChartType] = React.useState<string>("pie");

    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts);
    }

    const chartOptions: Highcharts.Options = {
        chart: {
            type: chartType,
            width: 400,
            height: 270,
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        title: {
            text: '유치ARPU 구간별 비중',
            align: "left",
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: ['10만원 이상', '8~10만원', '6~8만원', '4~6만원', '2~4만원','2만원 미만',],
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        },
        legend: {
            enabled: false, // 기본값은 false
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                // dataLabels: {
                //     enabled: true,
                //     useHTML: true, // HTML 포맷팅을 허용
                //     formatter: function () {
                //         return `
                //             <div style="text-align: center;">
                //                 <span style="font-size: 12px;">${this.point?.name}</span><br/>
                //                 <span style="font-size: 10px; color: gray;">${this.percentage?.toFixed(0)}%</span>
                //             </div>`;
                //     },
                //     style: {
                //         fontSize: "0.9em",
                //     },
                // },
                dataLabels: {
                    enabled: true,
                    distance: -20,
                    formatter: function () {
                        const chartType = this.series.chart.options.chart?.type; // 현재 차트 유형 확인
                        if(chartType === 'pie'){
                            return `${this.percentage?.toFixed(0)}%`; // 퍼센트 값만 표시
                        } else if(chartType === 'bar') {
                            return `${this.y}`;
                        }
                    },
                    style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        // color: "#FFFFFF", // 흰색 글자로 설정
                        // textOutline: "1px contrast", // 대비 outline 추가
                    },
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Registrations',
            colorByPoint: true,
            innerSize: '60%',
            data: [{
                name: '10만원 이상',
                y: 92569,
                color: 'red',
            }, {
                name: '8~10만원',
                y: 79967,
                color: 'orange'
            }, {
                name: '6~8만원',
                y: 51714,
                color: 'yellow'
            }, {
                name: '4~6만원',
                y: 39123,
                color: 'green'
            }, {
                name: '2~4만원',
                y: 25239,
                color: 'blue'
            }, {
                name: '2만원 미만',
                y: 13358,
                color: 'purple'

            }]
        }]
    };

    // 범례를 동적으로 활성화
    if (chartOptions.chart?.type === 'pie') {
        chartOptions.legend = {
            enabled: true,
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
            itemMarginTop: 10,
        };
    }

    return (
        <Row className="chart">
            <Row>
                <Select
                    defaultValue={selectItems[0].value}
                    options={selectItems}
                    onChange={(value: string) => {
                        setChartType(value);
                    }}
                    style={{width: '250px', marginBottom: '20px'}}
                />
            </Row>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </Row>
    );
}

export default RangeRatio;
