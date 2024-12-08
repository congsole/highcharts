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

const ageCategories = [
    '0세~9세', '10세~19세', '20세~29세', '30세~39세', '40세~49세', '50세~59세', '60세~69세', '70세 이상'
];
const Analysis: React.FC = () => {
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
                            { id: 'visiting-customer-analysis-title' },
                        ]
                    },
                    {
                        cells: [
                            {
                                rows: [
                                    { id: 'visiting-customer-number' },
                                    { id: 'visiting-customer-number-compare' }
                                ]
                            },
                            { id: 'visiting-customer-sex-age' },
                        ],
                    },
                    {
                        cells: [
                            { id: 'visiting-customer-transition' },
                        ],
                    },
                    {
                        cells: [
                            { id: 'visiting-customer-analysis-explaination' },
                        ]
                    },
                ],
            }],
        },
        components: [
            {
                cell: 'visiting-customer-analysis-title',
                type: 'HTML',
                title: '내방 고객 종합 분석',
            },
            {
                cell: 'visiting-customer-number',
                type: 'KPI',
                title: '내방 고객 수',
            },
            {
                cell: 'visiting-customer-number-compare',
                type: 'HTML',
                title: null,
            },
            {
                cell: 'visiting-customer-sex-age',
                type: '',
                title: '내방 고객 성별/연령',
                chart: {
                    type: 'bar'
                },
                accessibility: {
                    point: {
                        valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
                    }
                },
                xAxis: [{
                    categories: ageCategories,
                    reversed: false,
                    labels: {
                        step: 1
                    },
                    accessibility: {
                        description: 'Age (female)'
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: true,
                    categories: ageCategories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    },
                    accessibility: {
                        description: 'Age (male)'
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        format: '{value}'
                    },
                },

                plotOptions: {
                    series: {
                        stacking: 'normal',
                    }
                }
                tooltip: {
                    format: '<b>{series.name}, age {point.category}</b><br/>' +
                        'Population: {(abs point.y):.2f}%'
                },

                series: [{
                    name: 'Male',
                    data: [
                        -1.38, -2.09, -2.45, -2.71, -2.97,
                        -3.69, -4.04, -3.81, -4.19, -4.61,
                        -4.56, -4.21, -3.53, -2.55, -1.82,
                        -1.46, -0.78, -0.71
                    ]
                }, {
                    name: 'Female',
                    data: [
                        1.35, 1.98, 2.43, 2.39, 2.71,
                        3.02, 3.50, 3.52, 4.03, 4.40,
                        4.17, 3.88, 3.29, 2.42, 1.80,
                        1.39, 0.99, 1.15
                    ]
                }]
            },
            {
                cell: 'visiting-customer-transition',
                type: '',
                title: '내방 고객수 추이',
            },
            {
                cell: 'visiting-customer-analysis-explaination',
                type: 'HTML',
                title: null,
                elements: {
                    tagName: 'p',
                    textContent: 'MicroElement amount in Foods',
                }
            },
        ]
    };

    return (
        <Cell id="dashboard" className="chart" />
    );
};

export default Analysis;
