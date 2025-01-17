import * as React from 'react';
import './style.css';
import Dashboard from './component/Dashboard';

const kpiData = [
        ['판매량', 6421, 6.5],
        ['MNP', 2122, 6.5],
        ['평균 유치단가(RB)', 1350, 0.9],
        ['유치 ARPU', 388, 1],
    ];
const lineData = {
    'Installation & Developers' : [
        43934, 48656, 65165, 81827, 112143, 142383,
    171533, 165174, 155157, 161454, 154610, 168960, 171558
],
    'Manufacturing': [
    24916, 37941, 29742, 29851, 32490, 30282,
    38121, 36885, 33726, 34243, 31050, 33099, 33473
],
    'Sales & Distribution': [
        11744, 30000, 16005, 19771, 20185, 24377,
        32147, 30912, 29243, 29213, 25663, 28978, 30618
    ],
    'Operations & Maintenance': [
        null, null, null, null, null, null, null,
        null, 11164, 11218, 10077, 12530, 16585
    ],
    'Other': [
        21908, 5548, 8105, 11248, 8989, 11816, 18274,
        17300, 13053, 11906, 10073, 11471, 11648
    ]
};

const config = {
    dataPool: {
        connectors: [
            {
                id: 'micro-element',
                type: 'JSON',
                options: {
                    firstRowAsNames: false,
                    columnNames: ['구분', '값', '직전대비'],
                    data: kpiData,
                },
            },
            {
                id: 'employment-growth',
                type: 'JSON',
                options: {
                    firstRowAsNames: false,
                    columnNames: ['name', 2010, 2012, 2014, 2016, 2018, 2020, 2022],
                    data: lineData,
                }
            }
        ],
    },
    components: [
        {
            type: 'KPI',
            cell: 'kpi-sales',
            value: kpiData[0][1],
            valueFormat: '{value} 건',
            title: '판매량',
            subtitle: `직전대비 ${kpiData[0][2]}%`,
        },
        {
            type: 'KPI',
            cell: 'kpi-mnp',
            value: kpiData[1][1],
            title: 'MNP',
            valueFormat: '{value} 건',
            subtitle: `직전대비 ${kpiData[1][2]}%`,
        },
        {
            type: 'KPI',
            cell: 'kpi-averate-rb',
            value: kpiData[2][1],
            title: '평균 유치단가(RB)',
            valueFormat: '{value} 원',
            subtitle: `직전대비 ${kpiData[2][2]}%`,
        },
        {
            type: 'KPI',
            cell: 'kpi-arpu',
            value: kpiData[3][1],
            title: '유치 ARPU',
            valueFormat: '{value} 원',
            subtitle: `직전대비 ${kpiData[3][2]}%`,
        },
        {
            cell: 'title',
            type: 'HTML',
            elements: [
                {
                    tagName: 'h1',
                    textContent: 'MicroElement amount in Foods',
                },
            ],
        },
        {
            cell: 'line-handset',
            type: 'Highcharts',

            chartOptions: {
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    endOnTick: false,
                    startOnTick: false,
                    tickPositions: [112000]
                },

                xAxis: {
                    categories: [2010, 2012, 2014, 2016, 2018, 2020, 2022],
                    accessibility: {
                        rangeDescription: 'Range: 2010 to 2022'
                    },
                    title: {
                        text: null,
                    },
                    labels: {
                        enabled: false,
                    },
                    visible: false,
                },
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false,
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                chart: {
                    animation: false,
                    type: 'line',
                },
                title: {
                    text: 'Handset 판매량',
                    align: 'left'
                },
                // subtitle: {
                //     text: '제휴마케팅본부 / 제휴영업팀 / 특판 / LG u',
                //     align: 'right',
                // },
                tooltip: {
                    valueSuffix: ' mcg',
                    stickOnContact: true,
                },
                lang: {
                    accessibility: {
                        chartContainerLabel:
                            'Vitamin A in food. Highcharts Interactive Chart.',
                    },
                },
                accessibility: {
                    description: `The chart is displaying the Vitamin A amount in
              micrograms for some groceries. There is a plotLine demonstrating
              the daily Recommended Dietary Allowance (RDA) of 900
              micrograms.`,
                    point: {
                        valueSuffix: ' mcg',
                    },
                },
                series: [{
                    name: 'Handset 판매량',
                    data: lineData['Installation & Developers'],
                }
                ],
            },
        },
        {
            type: 'KPI',
            cell: 'line-handset-kpi',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-handset-kpi2',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-handset-kpi3',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-handset-kpi4',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            cell: 'line-mnp-in',
            type: 'Highcharts',

            chartOptions: {
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    endOnTick: false,
                    startOnTick: false,
                    tickPositions: [11200]
                },

                xAxis: {
                    categories: [2010, 2012, 2014, 2016, 2018, 2020, 2022],
                    accessibility: {
                        rangeDescription: 'Range: 2010 to 2022'
                    },
                    title: {
                        text: null,
                    },
                    labels: {
                        enabled: false,
                    },
                    visible: false,
                },
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false,
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                chart: {
                    animation: false,
                    type: 'line',
                },
                title: {
                    text: 'MNP in',
                    align: 'left'
                },
                // subtitle: {
                //     text: '제휴마케팅본부 / 제휴영업팀 / 특판 / LG u',
                //     align: 'right',
                // },
                tooltip: {
                    valueSuffix: ' mcg',
                    stickOnContact: true,
                },
                lang: {
                    accessibility: {
                        chartContainerLabel:
                            'Vitamin A in food. Highcharts Interactive Chart.',
                    },
                },
                accessibility: {
                    description: `The chart is displaying the Vitamin A amount in
              micrograms for some groceries. There is a plotLine demonstrating
              the daily Recommended Dietary Allowance (RDA) of 900
              micrograms.`,
                    point: {
                        valueSuffix: ' mcg',
                    },
                },
                series: [{
                    name: 'MNP in',
                    data: lineData['Operations & Maintenance'],
                }
                ],
            },
        },
        {
            type: 'KPI',
            cell: 'line-mnp-kpi1',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-mnp-kpi2',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-mnp-kpi3',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-mnp-kpi4',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            cell: 'line-rb',
            type: 'Highcharts',

            chartOptions: {
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    endOnTick: false,
                    startOnTick: false,
                    tickPositions: [20000]
                },

                xAxis: {
                    categories: [2010, 2012, 2014, 2016, 2018, 2020, 2022],
                    accessibility: {
                        rangeDescription: 'Range: 2010 to 2022'
                    },
                    title: {
                        text: null,
                    },
                    labels: {
                        enabled: false,
                    },
                    visible: false,
                },
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false,
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                chart: {
                    animation: false,
                    type: 'line',
                },
                title: {
                    text: '평균 유치단가',
                    align: 'left'
                },
                // subtitle: {
                //     text: '제휴마케팅본부 / 제휴영업팀 / 특판 / LG u',
                //     align: 'right',
                // },
                tooltip: {
                    valueSuffix: ' mcg',
                    stickOnContact: true,
                },
                lang: {
                    accessibility: {
                        chartContainerLabel:
                            'Vitamin A in food. Highcharts Interactive Chart.',
                    },
                },
                accessibility: {
                    description: `The chart is displaying the Vitamin A amount in
              micrograms for some groceries. There is a plotLine demonstrating
              the daily Recommended Dietary Allowance (RDA) of 900
              micrograms.`,
                    point: {
                        valueSuffix: ' mcg',
                    },
                },
                series: [{
                    name: '평균 유치단가',
                    data: lineData['Sales & Distribution'],
                }
                ],
            },
        },
        {
            type: 'KPI',
            cell: 'line-rb-kpi1',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-rb-kpi2',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-rb-kpi3',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-rb-kpi4',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            cell: 'line-arpu',
            type: 'Highcharts',

            chartOptions: {
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    endOnTick: false,
                    startOnTick: false,
                    tickPositions: [14000]
                },

                xAxis: {
                    categories: [2010, 2012, 2014, 2016, 2018, 2020, 2022],
                    accessibility: {
                        rangeDescription: 'Range: 2010 to 2022'
                    },
                    title: {
                        text: null,
                    },
                    labels: {
                        enabled: false,
                    },
                    visible: false,
                },
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false,
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                chart: {
                    animation: false,
                    type: 'line',
                },
                title: {
                    text: '유치 ARPU',
                    align: 'left'
                },
                // subtitle: {
                //     text: '제휴마케팅본부 / 제휴영업팀 / 특판 / LG u',
                //     align: 'right',
                // },
                tooltip: {
                    valueSuffix: ' mcg',
                    stickOnContact: true,
                },
                lang: {
                    accessibility: {
                        chartContainerLabel:
                            'Vitamin A in food. Highcharts Interactive Chart.',
                    },
                },
                accessibility: {
                    description: `The chart is displaying the Vitamin A amount in
              micrograms for some groceries. There is a plotLine demonstrating
              the daily Recommended Dietary Allowance (RDA) of 900
              micrograms.`,
                    point: {
                        valueSuffix: ' mcg',
                    },
                },
                series: [{
                    name: '유치 ARPU',
                    data: lineData['Other'],
                }
                ],
            },
        },
        {
            type: 'KPI',
            cell: 'line-arpu-kpi1',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-arpu-kpi2',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-arpu-kpi3',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            type: 'KPI',
            cell: 'line-arpu-kpi4',
            value: ['123,456'],
            title: null,
            valueFormat: '{value} 원',
        },
        {
            cell: 'dashboard-col-2',
            connector: {
                id: 'micro-element',
            },
            type: 'DataGrid',
            editable: true,
            sync: {
                highlight: true,
                visibility: true,
            },
        },
    ],
};

export default function App() {
    return <Dashboard config={config} />;
}
