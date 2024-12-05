"use client";

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
import HighchartsMore from 'highcharts/highcharts-more';
import Treemap from 'highcharts/modules/treemap';
import {Row} from "antd";

const RangeRatio: React.FC = () => {
    // Highcharts More 모듈 초기화
    if (typeof Highcharts === 'object') {
        HighchartsMore(Highcharts);
        HighchartsExporting(Highcharts);
        Treemap(Highcharts);
    }

    const chartOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
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
            text: 'Source: <a href="https://www.ssb.no/transport-og-reiseliv/faktaside/bil-og-transport">SSB</a>'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        },
        legend: {
            enabled: true, // 범례 표시
            layout: "vertical", // 세로 정렬
            align: "right", // 오른쪽 정렬
            verticalAlign: "middle", // 중간 정렬
            itemMarginTop: 10, // 항목 간 간격
            // itemStyle: {
            //     fontSize: "14px",
            // },
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
                        return `${this.percentage?.toFixed(0)}%`; // 퍼센트 값만 표시
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
                y: 92569
            }, {
                name: '8~10만원',
                y: 79967
            }, {
                name: '6~8만원',
                y: 51714
            }, {
                name: '4~6만원',
                y: 39123
            }, {
                name: '2~4만원',
                y: 25239
            }, {
                name: '2만원 미만',
                y: 13358
            }]
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

export default RangeRatio;
