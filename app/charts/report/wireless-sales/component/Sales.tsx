"use client";

import React from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards/es-modules/masters/dashboards.src';
import '@highcharts/dashboards/es-modules/masters/modules/layout.src';
import DataGrid from '@highcharts/dashboards/datagrid';
import Cell from '@app/charts/_component/Cell';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const region = ['수도권', 'PS&M', '제휴마케팅본부', '기업사업본부', '부산', 'MNO AI마케팅', '서부', '대구', '중부', '제주'];
const date = ['2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04', '2024-12-05', '2024-12-06', '2024-12-07', '2024-12-08', '2024-12-09', '2024-12-10', '2024-12-11', '2024-12-12', '2024-12-13', '2024-12-14', '2024-12-15',];
const cell = ['갤럭시 WIDE7', '갤럭시 S24', '아이폰16 PRO', '갤럭시 S24 울트라', '갤럭시퀀텀5', '아이폰15', '아이폰15 PRO', '아이폰16 PRO MAX', '갤럭시 A15', '갤럭시 A05', '갤럭시 A35', '아이폰14'];

function createRandomData(number: number) {
    const data = [];
    for (let i = 0; i < number; i++) {
        data.push(
            {
                region: region[Math.floor(Math.random() * region.length)],
                date: date[Math.floor(Math.random() * date.length)],
                cell: cell[Math.floor(Math.random() * cell.length)],
            }
        );
    }
    console.log("raw data created");
    return data;
}

const data = createRandomData(500);

// 마지막으로 클릭된 포인트와 차트 추적 (전역 상태)
let lastClickedPoint: Highcharts.Point | null = null;
let lastClickedChart: Highcharts.Chart | null = null;

const Sales: React.FC = () => {
    Highcharts.setOptions({
        chart: {
            styledMode: false
        }
    });

    // const [filterType, setFilterType] = React.useState<string>('');
    // const [filterValue, setFilterValue] = React.useState<string>('');
    const [filter, setFilter] = React.useState({
        filterType: '',
        filterValue: '',
        point: null,
        chart: null,
    });


    let byRegion: Map<string, number> = new Map<string, number>();
    let byDate: Map<string, number> = new Map<string, number>();
    let byCell: Map<string, number> = new Map<string, number>();

    function createDataNumber() {
        region.map(r => byRegion.set(r, 0));
        cell.map(c => byCell.set(c, 0));
        date.map(d => byDate.set(d, 0));
        data.map(d => {
            switch(filter.filterType) {
                case 'region':
                    byRegion.set(d.region, byRegion.get(d.region)! + 1);
                    if(d.region === filter.filterValue) {
                        byDate.set(d.date, byDate.get(d.date)! + 1);
                        byCell.set(d.cell, byCell.get(d.cell)! + 1);
                    }
                    break;
                case 'date':
                    byDate.set(d.date, byDate.get(d.date)! + 1);
                    if(d.date === filter.filterValue) {
                        byRegion.set(d.region, byRegion.get(d.region)! + 1);
                        byCell.set(d.cell, byCell.get(d.cell)! + 1);
                    }
                    break;
                case 'cell':
                    byCell.set(d.cell, byCell.get(d.cell)! + 1);
                    if(d.cell === filter.filterValue) {
                        byRegion.set(d.region, byRegion.get(d.region)! + 1);
                        byDate.set(d.date, byDate.get(d.date)! + 1);
                    }
                    break;
                default:
                    byRegion.set(d.region, byRegion.get(d.region)! + 1);
                    byDate.set(d.date, byDate.get(d.date)! + 1);
                    byCell.set(d.cell, byCell.get(d.cell)! + 1);
                    break;
            }
        });
        console.log("data filtered");
    }

    React.useEffect(() => {
        createDataNumber();
    }, []);

    React.useEffect(() => {
        createDataNumber();
        const chartOptions = {
            dataPool: {
                connectors: [
                    {
                        id: 'sales-data',
                        type: 'JSON',
                        options: {
                            firstRowAsNames: false,
                            columnNames: ['지역', '날짜', '단말'],
                            data: data,
                        },
                    },
                ]
            },
            gui: {
                layouts: [{
                    rows: [
                        {
                            cells: [
                                {id: 'sales-by-title'}
                            ],
                        },
                        {
                            cells: [
                                { id: 'sales-by-region' },
                                { id: 'sales-by-date' },
                                { id: 'sales-by-cell' },
                            ]
                        },
                    ],
                }],
            },
            components: [
                {
                    cell: 'sales-by-title',
                    type: 'HTML',
                    title: '지역/일별/단말별 판매량',
                },
                {
                    cell: 'sales-by-region',
                    type: 'Highcharts',
                    title: '지역별 판매',
                    chartOptions: {
                        chart: {
                            type: 'bar',
                            width: 400,
                        },
                        xAxis: {
                            labels: {
                                enabled: true,
                            },
                            categories: Array.from(byRegion.keys()),
                        },
                        yAxis: {
                            title: null,
                        },
                        legend: {
                            enabled: false,
                        },
                        tooltip: {
                            headerFormat: '<span style="">본부 <b>{point.x}</b></span><br>',
                            pointFormat: '<span style="">판매량 <b>{point.y}</b?></span>'
                        },
                        series: [
                            {
                                name: 'region',
                                colorByPoint: false,
                                data: Array.from(byRegion, ([key, value]) => {
                                    return {
                                        name: key,
                                        y: value,
                                        events: {
                                            click: function() {
                                                setFilter({...filter, filterType: this.series.name, filterValue: this.name, point: this, chart: this.series.chart});
                                                // console.log(this.series.name);
                                                // console.log(this.name);
                                            },
                                        }
                                    }
                                }),
                            }
                        ],
                    },
                },
                {
                    cell: 'sales-by-date',
                    type: 'Highcharts',
                    title: '일별 판매량',
                    chartOptions: {
                        chart: {
                            type: 'line',
                            width: 400,
                        },
                        xAxis: {
                            labels: {
                                enabled: true,
                            },
                            categories: Array.from(byDate.keys()),
                        },
                        yAxis: {
                            title: null,
                        },
                        legend: {
                            enabled: false,
                        },
                        tooltip: {
                            headerFormat: '<span style=""><b>{point.x}</b></span><br>',
                            pointFormat: '<span style="">판매량 <b>{point.y}</b?></span>'
                        },
                        series: [
                            {
                                name: 'date',
                                colorByPoint: false,
                                data: Array.from(byDate, ([key, value]) => {
                                    return {
                                        name: key,
                                        y: value,
                                        events: {
                                            click: function() {
                                                setFilter({...filter, filterType: this.series.name, filterValue: this.name, point: this, chart: this.series.chart});
                                            },
                                        }
                                    }
                                }),
                            }
                        ]
                    },
                },
                {
                    cell: 'sales-by-cell',
                    type: 'Highcharts',
                    title: '주요 단말별 판매',
                    chartOptions: {
                        chart: {
                            type: 'bar',
                            width: 400,
                        },
                        xAxis: {
                            labels: {
                                enabled: true,
                            },
                            categories: Array.from(byCell.keys()),
                        },
                        yAxis: {
                            title: null,
                        },
                        legend: {
                            enabled: false,
                        },
                        tooltip: {
                            headerFormat: '<span style="">단말명 <b>{point.x}</b></span><br>',
                            pointFormat: '<span style="">판매량 <b>{point.y}</b?></span>'
                        },
                        series: [
                            {
                                name: 'cell',
                                colorByPoint: false,
                                data: Array.from(byCell, ([key, value]) => {
                                    return {
                                        name: key,
                                        y: value,
                                        events: {
                                            click: function() {
                                                if(lastClickedPoint && lastClickedPoint.name === this.name) {
                                                    console.log("last clicked point === this");
                                                    setFilter({...filter, filterType: '', filterValue: '', point: null, chart: null});
                                                } else {
                                                    console.log("last clicked point !== this");
                                                    setFilter({...filter, filterType: this.series.name, filterValue: this.name, point: this, chart: this.series.chart});
                                                }
                                            },
                                        }
                                    }
                                }),
                            }
                        ],
                    },
                },
            ]
        };
        // Ensure the container exists in the DOM before initializing the dashboard
        const dashboardContainer = document.getElementById('dashboard');
        if (dashboardContainer) {
            // Create the dashboard with the chart options
            const dashboard = Dashboards.board('dashboard', chartOptions);
        } else {
            console.error('Dashboard container not found in the DOM');
        }
        if(filter.chart !== null && filter.point !== null) {
            highlightPoint(filter.chart, filter.point);
        }
    }, [filter]);



    const highlightPoint = (chart: Highcharts.Chart, point: Highcharts.Point) => {

        if (lastClickedPoint) {
            resetAllPoints(lastClickedChart!); // 이전 차트 원상복구
        }
        // 이미 클릭된 포인트라면 모든 포인트를 원상복구
        if (lastClickedPoint === point) {
            resetAllPoints(chart);
            lastClickedPoint = null; // 상태 초기화
            return;
        }

        // 이전 클릭된 포인트가 있다면 복구
        if (lastClickedPoint) {
            resetAllPoints(chart);
        }

        // 현재 클릭된 포인트를 강조
        point.update({
            color: '#1162b2', // 강조 색상
        }, false);

        // 나머지 포인트를 흐리게 처리
        chart.series[0].data.forEach(p => {
            if (p !== point) {
                p.update({
                    opacity: 0.3, // 흐리게 처리
                }, false);
            }
        });

        lastClickedPoint = point; // 클릭된 포인트 저장
        lastClickedChart = chart;

        chart.redraw(); // 차트 리렌더링
        console.log("re-draw clicked chart");
    };

    const resetAllPoints = (chart: Highcharts.Chart) => {
        // 모든 포인트를 초기 상태로 복구
        chart.series.forEach(series => {
            series.data.forEach(point => {
                point.update({
                    color: null, // 기본 색상
                    borderWidth: 0,
                    borderColor: null,
                    opacity: 1, // 투명도 복구
                }, false);
            });
        });
        chart.redraw(); // 차트 리렌더링
        console.log("resetAllPoints");
    };





    return (
        <Cell id="dashboard" className="chart" />
    );
};

export default Sales;
