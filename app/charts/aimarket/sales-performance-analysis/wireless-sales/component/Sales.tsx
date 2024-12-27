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

interface IProps {
    data: { channel: string; joinType: string; terminalType: string; region: string; date: string; cell: string; discountType: string | null; MNPbyBusiness: string | null; }[];
    region: string[];
    date: string[];
    cell: string[];
}

// 마지막으로 클릭된 포인트 추적
let lastClickedPoint: Highcharts.Point | null = null;
const charts: Map<string, Highcharts.Chart> = new Map<string, Highcharts.Chart>();

const Sales: React.FC<IProps> = ({ data, region, date, cell }) => {
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
    const byCellFiltered: Map<string, Array<number>> = new Map<string, Array<number>>();

    function createDataNumber() {
        region.map(r => byRegion.set(r, [0, 0]));
        cell.map(c => {
            byCell.set(c, [0, 0]);
            byCellFiltered.set(c, [0, 0]);
        });
        date.map(d => byDate.set(d, [0, 0]));
        data.map(d => {
            byCell.set(d.cell, [byCell.get(d.cell)![0] + 1, byCell.get(d.cell)![1]]);
            switch(filter.filterType) {
                case 'region':
                    byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                    if(d.region === filter.filterValue) {
                        byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                        byCellFiltered.set(d.cell, [byCellFiltered.get(d.cell)![0] + 1, byCellFiltered.get(d.cell)![1]]);
                    }
                    break;
                case 'date':
                    byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                    if(d.date === filter.filterValue) {
                        byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                        byCellFiltered.set(d.cell, [byCellFiltered.get(d.cell)![0] + 1, byCellFiltered.get(d.cell)![1]]);
                    }
                    break;
                case 'cell':
                case 'cell-filtered':
                    byCellFiltered.set(d.cell, [byCellFiltered.get(d.cell)![0] + 1, byCellFiltered.get(d.cell)![1]]);
                    if(d.cell === filter.filterValue) {
                        byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                        byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                    }
                    break;
                default:
                    byRegion.set(d.region, [byRegion.get(d.region)![0] + 1, byRegion.get(d.region)![1]]);
                    byDate.set(d.date, [byDate.get(d.date)![0] + 1, byDate.get(d.date)![1]]);
                    byCellFiltered.set(d.cell, [byCellFiltered.get(d.cell)![0] + 1, byCellFiltered.get(d.cell)![1]]);
                    break;
            }
        });
        sortMapByValueDesc(byRegion);
        sortMapByValueDesc(byCell, true);
        sortMapByValueDesc(byCellFiltered, true);
        console.log("data filtered");
    }
    function sortMapByValueDesc(map: Map<string, Array<number>>, getPercent = false) {
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
        const chartOptions = {
            dataPool: {
                connectors: [
                    {
                        id: 'sales-data',
                        type: 'JSON',
                        options: {
                            firstRowAsNames: false,
                            columnNames: ['지역', '날짜', '단말',],
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
                            // headerFormat: '<span style="">본부 <b>{point.x}</b></span><br>',
                            // pointFormat: '<span style="">판매량 <b>{point.y}</b?></span>'
                            formatter: function():string {
                                return `<p>본부 <b>${this.point.name}</b><br>판매량 <b>${Highcharts.numberFormat(this.point.y, 0, '.', ',')}</b></p>`;
                            }
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true,
                                    distance: -10,
                                    formatter: function (): string {
                                        return `${Highcharts.numberFormat(this.point.y, 0, '.', ',')}건`;
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
                                // step: 3,
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
                            crosshairs: [
                                { // x축
                                    color: 'gray',
                                    width: 1.5,
                                    dashStyle: 'solid'
                                },
                                // { // y축
                                //     color: 'gray',
                                //     width: 1,
                                //     dashStyle: 'Dot'
                                // }
                            ],
                            // headerFormat: '<span style=""><b>{point.x}</b></span><br>',
                            // pointFormat: '<span style="">판매량 <b>{point.y}</b?></span>'
                            formatter: function():string {
                                return `<p><b>${this.point.name}</b><br>판매량 <b>${Highcharts.numberFormat(this.point.y, 0, '.', ',')}</b></p>`;
                            }
                        },
                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: false,
                                    states: {
                                        hover: {
                                            enabled: true,
                                        }
                                    },
                                    radius: 2.5,
                                    lineWidth: 2,
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
                                    this.series.map(s => charts.set(s.name, this));
                                }
                            }
                        },
                        xAxis: {
                            labels: {
                                enabled: true,
                            },
                            categories: Array.from(byCell.keys()).slice(0, 5),
                        },
                        yAxis: {
                            title: null,
                        },
                        legend: {
                            enabled: false,
                        },
                        tooltip: {
                            // headerFormat: '<span style="">단말명 <b>{point.x}</b></span><br>',
                            // pointFormat: '<span style="">판매량 <b>{point.y}</b?></span>'
                            formatter: function():string | boolean {
                                const extraInfo =
                                    (filter.filterType === 'region' || filter.filterType === 'date')
                                        ? `<br>강조표시됨 <b>${Highcharts.numberFormat(byCellFiltered.get(this.point.name)![0], 0, '.', ',')}</b>`
                                        : '';
                                return `<p>단말명 <b>${this.point.name}</b><br>판매량 <b>${Highcharts.numberFormat(byCell.get(this.point.name)![0], 0, '.', ',')}</b>${extraInfo}</p>`;
                            }
                        },
                        plotOptions: {
                            series: {
                                stacking: 'overlap', // 막대 쌓기 활성화
                            },
                            bar: {
                                dataLabels: {
                                    enabled: true,
                                    distance: -10,
                                    formatter: function () {
                                        if(this.series.name !== 'cell') {
                                            return `${Highcharts.numberFormat(this.point.y, 0, '.', ',')}건 (${this.point.p?.toFixed(2)}%)`; // 퍼센트 값만 표시
                                        }
                                    }
                                }
                            }
                        },
                        series: [
                            {
                                name: 'cell',
                                colorByPoint: false,
                                opacity: 0.5,
                                data: Array.from(byCell).slice(0, 5).map(([key, value]) => {
                                    return {
                                        name: key,
                                        y: value[0] - byCellFiltered.get(key)![0],
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
                            },
                            {
                                name: 'cell-filtered',
                                colorByPoint: false,
                                color: Highcharts.getOptions().colors![0], // cell-filtered 시리즈 색상 동일
                                data: Array.from(byCell.keys()).slice(0, 5).map((key) => {
                                    const value = byCellFiltered.get(key);
                                    return {
                                        name: key,
                                        y: value ? value[0] : null,
                                        p: value ? value[1] : null,
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
                                })
                            },
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
    }, [data, filter]);

    const highlightPoint = (filterType: string, filterValue: string) => {
        const chart = charts.get(filterType) ? charts.get(filterType)! : null;
        const point = lastClickedPoint = chart ? chart.series.find(s => s.name === filterType)!.data.find(p => p.name === filterValue)! : null; // 클릭된 포인트 저장

        if (!chart || !point) return;

        // 나머지 포인트를 흐리게 처리
        chart.series.map(s => s.data.forEach(p => {
            p.update({
                opacity: 0.3, // 흐리게 처리
            }, false);
        }));

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
        chart.series.map(s => s.data.map(p => {
            if(p.name === filterValue) {
                p.update({
                    color: '#1162b2', // 강조 색상
                    opacity: 1,
                }, false)
            }
        }));

        chart.redraw(); // 차트 리렌더링
    };

    return (
        <Cell id="dashboard" className="chart" />
    );
};

export default Sales;
