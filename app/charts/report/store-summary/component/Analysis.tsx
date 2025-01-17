"use client";

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards/es-modules/masters/dashboards.src';
import '@highcharts/dashboards/es-modules/masters/modules/layout.src';
import Cell from '../../../_component/Cell';

// polar 타입 그리려면 필요
import HighchartsMore from "highcharts/highcharts-more";

// x축 카테고리 하나당 y축 하나를 그리기 위해서 필요
import HighchartsParallelCoordinates from 'highcharts/modules/parallel-coordinates';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);

const categories = [
    '무선판매량', '유선판매량', '유치 ARPU', '단골 고객수', '내방 고객수', '판매 성공율',
];
const Analysis: React.FC = () => {
    if (typeof Highcharts === 'object') {
        HighchartsParallelCoordinates(Highcharts);
        HighchartsMore(Highcharts);
    }
    Highcharts.setOptions({
        chart: {
            styledMode: false
        }
    });

    useEffect(() => {
        // Ensure the container exists in the DOM before initializing the dashboard
        const dashboardContainer = document.getElementById('store-analysis');
        if (dashboardContainer) {
            Dashboards.board('store-analysis', chartOptions);
        } else {
            console.error('Dashboard container not found in the DOM');
        }
    }, []);

    const chartOptions = {
        dataPool: {
            connectors: []
        },
        gui: {
            layouts: [{
                rows: [
                    {
                        cells: [
                            { id: 'store-analysis-title' },
                        ]
                    },
                    {
                        cells: [
                            { id: 'store-analysis-wireless-sales' },
                            { id: 'store-analysis-wire-sales' },
                        ],
                    },
                    {
                        cells: [
                            { id: 'store-analysis-polygon' },
                        ],
                    },
                    {
                        cells: [
                            { id: 'store-analysis-text' },
                        ],
                    },
                ],
            }],
        },
        components: [
            {
                cell: 'store-analysis-title',
                type: 'HTML',
                title: '종합분석',
            },
            // {
            //     cell: 'store-analysis-wireless-sales',
            //     type: 'KPI',
            //     title: '무선판매량(H/S기준)',
            // },
            // {
            //     cell: 'store-analysis-wire-sales',
            //     type: 'KPI',
            //     title: '유선판매량',
            // },
            {
                cell: 'store-analysis-polygon',
                type: 'Highcharts',
                title: 'Highcharts Polar Chart',
                chartOptions: {
                    chart: {
                        width: 800,
                        parallelCoordinates: true,
                        parallelAxes: {
                            labels: {
                                style: {
                                    // opacity: 0.7,
                                    fontSize: '8px',
                                    // color: '#000'
                                }
                            },
                            // gridLineWidth: 0,
                            showFirstLabel: false,
                            minPadding: 0.2,
                            // tickPixelInterval: 10,
                            // lineWidth: 0
                        },
                        polar: true,
                    },
                    title: {
                        text: null,
                    },
                    pane: {
                        startAngle: -30,
                        // endAngle: 360
                        // size: '120%',
                    },

                    xAxis: {
                        categories: categories,
                        tickInterval: 1,
                        min: 0,
                        max: 6,
                        labels: {
                            distance: 20,
                            style: {
                                // fontWeight: 'bold'
                            }
                        },
                        gridLineWidth: 0,
                    },
                    yAxis: [
                        {
                            labels: {
                                distance: 20
                            },
                            min: 0,
                            max: 1.01,
                            tickInterval: 0.1,
                            lineColor: 'black',
                        },
                        {
                            labels: {
                            },
                            min: 0,
                            max: 1.01,
                            tickInterval: 0.1,
                            lineColor: 'black',
                        },
                        {
                            labels: {
                            },
                            min: 0,
                            max: 1.01,
                            tickInterval: 0.1,
                            lineColor: 'black',
                        },
                        {
                            labels: {
                            },
                            min: 0,
                            max: 1.01,
                            tickInterval: 0.1,
                            lineColor: 'black',
                        },
                        {
                            labels: {
                            },
                            min: 0,
                            max: 1.01,
                            tickInterval: 0.1,
                            lineColor: 'black',
                        },
                        {
                            labels: {
                            },
                            min: 0,
                            max: 1.01,
                            tickInterval: 0.1,
                            lineColor: 'black',
                        },
                    ],

                    plotOptions: {
                        series: {
                            pointStart: 0,
                            pointInterval: 1
                        },
                        column: {
                            pointPadding: 0,
                            groupPadding: 0
                        }
                    },
                    tooltip: {
                        // format: '<b>{series.name}, age {point.category}</b><br/>' +
                        //     'Population: {(abs point.y):.2f}%'
                    },
                    series: [{
                        type: 'area',
                        name: 'Area',
                        data: [1, 0.22, 0.93, 0.54, 0.85, 0.36]
                    }],
                },
            },
        ],
    };

    return (
        <Cell id="store-analysis" className="chart" />
    );
};

export default Analysis;
