"use client";

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards/es-modules/masters/dashboards.src';
import '@highcharts/dashboards/es-modules/masters/modules/layout.src';
import Cell from '../../../_component/Cell';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);

const ArpuAnalysis: React.FC = () => {

    useEffect(() => {
        // Ensure the container exists in the DOM before initializing the dashboard
        const dashboardContainer = document.getElementById('dashboard');
        if (dashboardContainer) {
            Dashboards.board('dashboard', chartOptions);
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
                            { id: 'arpu-dashboard-title' },
                        ]
                    },
                    {
                        cells: [
                            { id: 'attract-arpu-title' },
                        ]
                    },
                    {
                        id: 'attract-arpu-wrapper',
                        cells: [
                            { id: 'attract-arpu' }, // KPI
                            { id: 'attract-arpu-chart' } // Column Chart
                        ],
                    },


                    {
                        cells: [
                            { id: 'attract-arpu-by-join-type-title' },
                        ]
                    },
                    {
                        cells: [
                            { id: 'attract-arpu-by-join-type-1' },
                            { id: 'attract-arpu-by-join-type-2' }
                        ],
                    },
                    {
                        cells: [
                            { id: 'average-attract-arpu-by-group' },
                            { id: 'attract-arpu-top-device' }
                        ]
                    },
                ],
            }],
        },
        components: [
            {
                cell: 'arpu-dashboard-title',
                type: 'HTML',
                title: '유치 ARPU 종합분석'
            },
            {
                cell: 'attract-arpu-title',
                type: 'HTML',
                title: '유치 ARPU'
            },
            {
                cell: 'attract-arpu',
                type: 'KPI' as const,
                title: null,
                value: '<p><span class="attract-arpu-value">60,102</span> 원</p>',
                subtitle: '<p>직전대비 <span class="attract-arpu-subtitle">-0.6%</span></p>',
                className: 'custom-kpi',
            },
            {
                cell: 'attract-arpu-chart',
                type: 'Highcharts',
                title: '  ',
                chartOptions: {
                    chart: {
                        type: 'column',
                        width: 200, // Width of the column chart
                        height: 200, // Height of the column chart
                    },
                    xAxis: {
                        categories: [
                            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
                        ],
                        labels: {
                            enabled: false,
                        }
                    },
                    yAxis: {
                        title: {
                            text: null,
                        },
                        labels: {
                            enabled: false,
                        },
                        endOnTick: false,
                        startOnTick: false,
                        tickPositions: [],
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        type: 'column',
                        name: '2020',
                        data: [59, 83, 65, 228, 184, 59, 83, 65, 228, 184, 59, 83, 65, 228, 184, 59, 83, 65, 228, 184,],
                    }],
                },
            },
            {
                cell: 'attract-arpu-by-join-type-title',
                type: 'HTML',
                title: '가입유형별 유치ARPU',
            },
            {
                cell: 'attract-arpu-by-join-type-1',
                type: 'Highcharts',
                title: '',
                chartOptions: {
                    chart: {
                        type: 'column',
                        width: 390, // Width of the column chart
                        height: 200, // Height of the column chart
                    },
                    xAxis: {
                        labels: {
                            enabled: true,
                        },
                        categories: ['010', 'MNP', '기변']
                        // visible: false,
                    },
                    yAxis: {
                        title: {
                            text: null,
                        },
                        labels: {
                            enabled: true,
                        },
                        endOnTick: false,
                        startOnTick: false,
                        tickPositions: [],
                        max: 150000
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        name: 'arpu',
                        colorByPoint: true,
                        data: [
                            {
                                name: '010',
                                y: 33309,
                            },
                            {
                                name: 'MNP',
                                y: 40842,
                            },
                            {
                                name: '기변',
                                y: 71868,
                            },
                        ]
                    }],
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.y}원',
                            },
                            pointWidth: 90,
                        }
                    }
                },
            },
            {
                cell: 'attract-arpu-by-join-type-2',
                type: 'Highcharts',
                title: '',
                chartOptions: {
                    chart: {
                        type: 'column',
                        width: 390, // Width of the column chart
                        height: 200, // Height of the column chart
                    },
                    xAxis: {
                        labels: {
                            enabled: true,
                        },
                        categories: ['지원금약정', '선택약정',]
                        // visible: false,
                    },
                    yAxis: {
                        title: {
                            text: null,
                        },
                        labels: {
                            enabled: true,
                        },
                        endOnTick: false,
                        startOnTick: false,
                        tickPositions: [],
                        max: 150000,
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        name: 'arpu',
                        colorByPoint: true,
                        data: [
                            {
                                name: '지원금약정',
                                y: 88806,
                            },
                            {
                                name: '선택약정',
                                y: 50259,
                            },
                        ]
                    }],
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.y}원',
                            },
                            pointWidth: 90,
                        }
                    }
                },

            },
            {
                cell: 'average-attract-arpu-by-group',
                type: 'Highcharts',
                title: '조직별 평균유치 ARPU',
                chartOptions: {
                    chart: {
                        type: 'bar',
                        width: 390, // Width of the column chart
                    },
                    xAxis: {
                        labels: {
                            enabled: true,
                        },
                        categories: ['제휴마케팅본부', '제주', '중부', '기업사업본부', '서부', '수도권', 'PS&M', '대구', '부산', 'MNO AI마케팅',]
                        // visible: false,
                    },
                    yAxis: {
                        title: {
                            text: null,
                        },
                        labels: {
                            enabled: true,
                        },
                        endOnTick: false,
                        tickPositions: [0, 50000],
                        max: 80000,
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        name: 'average-arpu-by-group',
                        colorByPoint: false,
                        data: [65091, 65091, 61181, 59158, 57000, 56900, 54000, 53000, 52000, 50000]
                    }],
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.y}원',
                            },
                            pointWidth: 90,
                        }
                    }
                },
            },
            {
                cell: 'attract-arpu-top-device',
                type: 'Highcharts',
                title: '유치ARPU 상위 단말',
                chartOptions: {
                    chart: {
                        type: 'bar',
                        width: 390, // Width of the column chart
                    },
                    xAxis: {
                        labels: {
                            enabled: true,
                        },
                        categories: ['아이폰16 PRO', '아이폰16', '갤럭시Z폴드5', '갤럭시Z플립5', '갤럭시S24', '갤럭시S24+',]
                        // visible: false,
                    },
                    yAxis: {
                        title: {
                            text: null,
                        },
                        labels: {
                            enabled: true,
                        },
                        endOnTick: false,
                        tickPositions: [0, 100000],
                        max: 150000,
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        name: 'average-arpu-by-group',
                        colorByPoint: false,
                        data: [113637, 93777, 92000, 91000, 90000, 89000]
                    }],
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.y}원',
                            },
                            pointWidth: 90,
                        }
                    }
                },
            }
        ]
    };

    return (
        <Cell id="dashboard" className="chart" />
    );
};

export default ArpuAnalysis;
