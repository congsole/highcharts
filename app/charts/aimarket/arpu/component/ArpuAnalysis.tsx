"use client";

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards/es-modules/masters/dashboards.src';
import '@highcharts/dashboards/es-modules/masters/modules/layout.src';
import DataGrid from '@highcharts/dashboards/datagrid';
import Cell from '../../../_component/Cell';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const ArpuAnalysis: React.FC = () => {
    Highcharts.setOptions({
        chart: {
            styledMode: false
        }
    });

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
                            { id: 'attract-arpu' }, // KPI
                            { id: 'attract-arpu-chart' } // Column Chart
                        ],
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
                cell: 'attract-arpu',
                type: 'KPI' as const,
                title: '유치 ARPU',
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
                cell: 'attract-arpu-by-join-type-1',

            }
        ]
    };

    return (
        <Cell id="dashboard" className="chart" />
    );
};

export default ArpuAnalysis;
