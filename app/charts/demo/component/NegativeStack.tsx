"use client";

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards/es-modules/masters/dashboards.src';
import '@highcharts/dashboards/es-modules/masters/modules/layout.src';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);

const NegativeStack: React.FC = () => {

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
                            { id: 'left-side' },
                            { id: 'right-side' },
                        ]
                    },
                ],
            }],
        },
        components: [
            {
                cell: 'left-side',
                type: 'Highcharts',
                title: null,
                chartOptions: {
                    chart: {
                        title: null,
                        type: 'bar',
                        width: 200, // Width of the column chart
                        height: 200, // Height of the column chart
                    },
                    xAxis: {
                        categories: ['나이1', '나이2', '나이3', '나이4', '나이5'],
                        labels: {
                            enabled: false,
                        },
                        opposite: true,
                    },
                    yAxis: {
                        title: {
                            text: null,
                        },
                        labels: {
                            formatter() {
                                return `${Math.abs(this.value)}%`;
                            }
                        },
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        name: '여자',
                        data: [-30, 0, -40, -20, -50],
                    }],
                },
            },
            {
                cell: 'right-side',
                type: 'Highcharts',
                title: null,
                chartOptions: {
                    chart: {
                        title: null,
                        type: 'bar',
                        width: 200, // Width of the column chart
                        height: 200, // Height of the column chart
                    },
                    xAxis: {
                        categories: ['나이1', '나이2', '나이3', '나이4', '나이5'],
                        labels: {
                            enabled: true,
                        }
                    },
                    yAxis: {
                        title: {
                            text: null,
                        },
                        labels: {
                            formatter() {
                                return `${Math.abs(this.value)}%`;
                            }
                        },
                        // endOnTick: false,
                        // startOnTick: false,
                        // tickPositions: [],
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        name: '남자',
                        data:  [15, 20, 0, 29, 21],
                    }],
                },
            },
        ]
    };

    return (
        <div id="dashboard" style={{
            display: "flex",
            justifyContent: "flex-start",
        }}/>
    );
};

export default NegativeStack;
