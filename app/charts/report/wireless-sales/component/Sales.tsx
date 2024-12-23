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
const charts: Map<string, Highcharts.Chart> = new Map<string, Highcharts.Chart>();

const Sales: React.FC = () => {
    Highcharts.setOptions({
        chart: {
            styledMode: false
        }
    });

    const [filter, setFilter] = React.useState({
        filterType: '',
        filterValue: '',
    });


    const byRegion: Map<string, Array<number>> = new Map<string, Array<number>>();
    const byDate: Map<string, Array<number>> = new Map<string, Array<number>>();
    const byCell: Map<string, Array<number>> = new Map<string, Array<number>>(); // key: 기기이름, value: [건수, 비중]

    function createDataNumber() {
        region.map(r => byRegion.set(r, [0, 0]));
        cell.map(c => byCell.set(c, [0, 0]));
        date.map(d => byDate.set(d, [0, 0]));
        data.map(d => {
            switch(filter.filterType) {
                case 'region':
                    byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                    if(d.region === filter.filterValue) {
                        byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                        byCell.set(d.cell, [byCell.get(d.cell)![0] + 1, byCell.get(d.cell)![1]]);
                    }
                    break;
                case 'date':
                    byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                    if(d.date === filter.filterValue) {
                        byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                        byCell.set(d.cell, [byCell.get(d.cell)![0] + 1, byCell.get(d.cell)![1]]);
                    }
                    break;
                case 'cell':
                    byCell.set(d.cell, [byCell.get(d.cell)![0] + 1, byCell.get(d.cell)![1]]);
                    if(d.cell === filter.filterValue) {
                        byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                        byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                    }
                    break;
                default:
                    byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                    byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                    byCell.set(d.cell, [byCell.get(d.cell)![0] + 1, byCell.get(d.cell)![1]]);
                    break;
            }
        });
        sortMapByValueDescTopN(byRegion);
        sortMapByValueDescTopN(byCell, true);
        console.log("data filtered");
    }
    function sortMapByValueDescTopN(map: Map<string, Array<number>>, getPercent = false) {
        const mapArray = Array.from(map);
        const sortedArray = mapArray.sort((a,b) => - a[1][0] + b[1][0]);
        if(getPercent) {
            let sum = 0;
            sortedArray.map(point => sum += point[1][0]);
            sortedArray.map(point => point[1][1] = point[1][0]/sum*100);
        }
        map.clear();
        for(const [key, value] of sortedArray) {
            map.set(key, value);
        }
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
                            events: {
                                load: function() {
                                    charts.set(this.series[0].name, this);
                                }
                            }
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
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true,
                                    distance: -10,
                                    formatter: function () {
                                        return `${this.point.y}건`;
                                    }
                                }
                            }
                        },
                        series: [
                            {
                                name: 'region',
                                colorByPoint: false,
                                data: Array.from(byRegion, ([key, value]) => {
                                    return {
                                        name: key,
                                        y: value[0],
                                        events: {
                                            click: function() {
                                                if(lastClickedPoint && lastClickedPoint.name === this.name) {
                                                    console.log("last clicked point === this");
                                                    setFilter({...filter, filterType: '', filterValue: ''});
                                                } else {
                                                    console.log("last clicked point !== this");
                                                    setFilter({...filter, filterType: this.series.name, filterValue: this.name});
                                                }
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
                            zooming: {
                                type: 'x',
                            },
                            events: {
                                load: function() {
                                    charts.set(this.series[0].name, this);
                                }
                            }
                        },
                        xAxis: {
                            type: 'datetime',
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
                            crosshairs: true,
                            headerFormat: '<span style=""><b>{point.x}</b></span><br>',
                            pointFormat: '<span style="">판매량 <b>{point.y}</b?></span>'
                        },
                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: true,
                                    radius: 2.5,
                                    lineWidth: 1,
                                    lineColor: null
                                }
                            }
                        },
                        series: [
                            {
                                name: 'date',
                                colorByPoint: false,
                                data: Array.from(byDate, ([key, value]) => {
                                    return {
                                        name: key,
                                        y: value[0],
                                        events: {
                                            click: function() {
                                                if(lastClickedPoint && lastClickedPoint.name === this.name) {
                                                    console.log("last clicked point === this");
                                                    setFilter({...filter, filterType: '', filterValue: ''});
                                                } else {
                                                    console.log("last clicked point !== this");
                                                    setFilter({...filter, filterType: this.series.name, filterValue: this.name});
                                                }
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
                            events: {
                                load: function() {
                                    charts.set(this.series[0].name, this);
                                }
                            }
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
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true,
                                    distance: -10,
                                    formatter: function () {
                                        return `${this.point.y}건      (${this.point.p?.toFixed(2)}%)`; // 퍼센트 값만 표시
                                    }
                                }
                            }
                        },
                        series: [
                            {
                                name: 'cell',
                                colorByPoint: false,
                                data: Array.from(byCell).slice(0, 5).map(([key, value]) => {
                                    return {
                                        name: key,
                                        y: value[0],
                                        p: value[1],
                                        events: {
                                            click: function() {
                                                if(lastClickedPoint && lastClickedPoint.name === this.name) {
                                                    console.log("last clicked point === this");
                                                    setFilter({...filter, filterType: '', filterValue: ''});
                                                } else {
                                                    console.log("last clicked point !== this");
                                                    setFilter({...filter, filterType: this.series.name, filterValue: this.name});
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
            setTimeout(() => {
                highlightPoint(filter.filterType, filter.filterValue);
            },0);
        } else {
            console.error('Dashboard container not found in the DOM');
        }
    }, [filter]);

    const highlightPoint = (filterType: string, filterValue: string) => {

        let chart, point;
        lastClickedChart = chart = charts.get(filterType) ? charts.get(filterType)! : null;
        lastClickedPoint = point = chart ? chart.series[0].data.find(p => p.name === filterValue)! : null; // 클릭된 포인트 저장

        if (!chart || !point) return;


        // 나머지 포인트를 흐리게 처리
        chart.series[0].data.forEach(p => {
            if (p !== point) {
                p.update({
                    opacity: 0.3, // 흐리게 처리
                }, false);
            }
        });

        if(filter.filterType === 'date') {
            chart.xAxis[0].addPlotLine({
                value: point.x,
                color: '#1162b2',
                width: 2,
                id: 'clicked-point-line',
                zIndex: 5,
                dashStyle: 'Dash',
                label: { // 레이블 추가 (옵션)
                    text: `Date: ${point.name}`,
                    align: 'right',
                    verticalAlign: 'middle',
                    style: { color: '#1162b2' }
                }
            });
            // 클릭한 포인트가 포함된 라인의 색 변경
            chart.series[0].update(
                {
                    opacity: 0.3, // 흐리게 처리
                },
                false // 리렌더링 방지
            );
        }
        // 현재 클릭된 포인트를 강조
        point.update({
            color: '#1162b2', // 강조 색상
            opacity: 1, // 흐리게 처리
        }, false);


        chart.redraw(); // 차트 리렌더링
    };

    return (
        <Cell id="dashboard" className="chart" />
    );
};

export default Sales;
