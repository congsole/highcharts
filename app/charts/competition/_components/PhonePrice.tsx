"use client";

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
import HighchartsMore from 'highcharts/highcharts-more'; // boxplot 포함

interface MapData {
    phoneName: string;
    SKT: object; 
    KT: object; 
    LGU: object; 
}

const mapData: MapData[] = [
    {
        phoneName: "IPHONE 16",
        SKT: [40,65,75,85,100],
        KT: [45,74,80,85,98],
        LGU: [50,64,78,82,96],
    },
    {
        phoneName: "IPHONE 16 PRO",
        SKT: [42,65,77,91,100],
        KT: [48,70,81,89,94],
        LGU: [46,67,79,92,97],
    },
    {
        phoneName: "갤럭시 Z플립6",
        SKT: [3,30,43.5,53,63],
        KT: [9,29,60,68,81],
        LGU: [37,58,67,73,83],
    },
    {
        phoneName: "갤럭시 S24",
        SKT: [43,77,83,95,99],
        KT: [55,74,85,96,100],
        LGU: [60,78,86,97,100],
    }
];

const PhonePrice: React.FC = () => {
    // Highcharts More 모듈 초기화
    if (typeof Highcharts === 'object') {
        HighchartsMore(Highcharts);
        HighchartsExporting(Highcharts)
    }

    const chartOptions: Highcharts.Options = {
        chart: {
            type: 'boxplot'
        },

        title: {
            text: 'Highcharts Box Plot Example'
        },

        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },

        xAxis: {
            categories: mapData.map(({ phoneName }) => {
                return phoneName;
            }),
            title: {
                text: '기종'
            }
        },
        yAxis: {
            title: {
                text: '가격'
            },
            // plotLines: [{
            //     value: 932,
            //     color: 'red',
            //     width: 1,
            //     label: {
            //         text: 'Theoretical mean: 932',
            //         align: 'center',
            //         style: {
            //             color: 'gray'
            //         }
            //     }
            // }]
        },
        plotOptions: {
            series: {
                borderColor: 'red',
            }
        },
        series: [
            {
                type: 'boxplot',
                name: 'SKT',
                data: mapData.map((data) => data.SKT),
                color: '#834ea1',
                fillColor: '#bf7cec',
            },
            {
                type: 'boxplot',
                name: 'KT',
                data: mapData.map((data) => data.KT),
                color: '#737373',
                fillColor: '#a6a8a5',
            },
            {
                type: 'boxplot',
                name: 'LGU',
                data: mapData.map((data) => data.LGU),
                color: '#f42393',
                fillColor: '#fb54ae',
            },
        // {
        //     name: 'Outliers',
        //     color: Highcharts.getOptions().colors[0],
        //     type: 'scatter',
        //     data: [ // x, y positions where 0 is the first category
        //         [0, 644],
        //         [4, 718],
        //         [4, 951],
        //         [4, 969]
        //     ],
        //     marker: {
        //         fillColor: 'white',
        //         lineWidth: 1,
        //         lineColor: Highcharts.getOptions().colors[0]
        //     },
        //     tooltip: {
        //         pointFormat: 'Observation: {point.y}'
        //     }
        // }
        ]
    };

    return (<>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
     </>);
}

export default PhonePrice;
