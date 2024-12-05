"use client";

import React from 'react';
import Highcharts from 'highcharts';
import * as HighchartsMap from 'highcharts/highmaps';
import HighchartsExporting from 'highcharts/modules/exporting';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
import { getTopology } from '../_service/charts/actions';


export default function Page() {
    const [ mapOptions, setMapOptions ] = React.useState({});

    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts)
    }

    const initialOptions = {
        title: {
            text: 'Sales of petroleum products March, Norway',
            align: 'left'
        },
        xAxis: {
            categories: [
                'Jet fuel', 'Duty-free diesel', 'Petrol', 'Diesel', 'Gas oil'
            ]
        },
        yAxis: {
            title: {
                text: 'Million liters'
            }
        },
        tooltip: {
            valueSuffix: ' million liters'
        },
        plotOptions: {
            series: {
                borderRadius: '0%'
            }
        },
        series: [{
            type: 'column',
            name: '2020',
            data: [59, 83, 65, 228, 184]
        }, {
            type: 'column',
            name: '2021',
            data: [24, 79, 72, 240, 167]
        }, {
            type: 'column',
            name: '2022',
            data: [58, 88, 75, 250, 176]
        }, {
            type: 'line',
            step: 'center',
            name: 'Average',
            data: [47, 83.33, 70.66, 239.33, 175.66],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total',
            data: [{
                name: '2020',
                y: 619,
                color: Highcharts.getOptions().colors[0], // 2020 color
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    format: '{point.total} M',
                    style: {
                        fontSize: '15px'
                    }
                }
            }, {
                name: '2021',
                y: 586,
                color: Highcharts.getOptions().colors[1] // 2021 color
            }, {
                name: '2022',
                y: 647,
                color: Highcharts.getOptions().colors[2] // 2022 color
            }],
            center: [75, 65],
            size: `100`,
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }],
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const topology = await getTopology();
                // const data = await getData();
                //
                // // Make codes uppercase to match the map data
                // data.forEach(function (p: { code: string }) {
                //     p.code = p.code.toUpperCase();
                // });

                console.log(topology);

                const data = [
                    ['kr-4194', 10], ['kr-kg', 11], ['kr-cb', 12], ['kr-kn', 13],
                    ['kr-2685', 14], ['kr-pu', 15], ['kr-2688', 16], ['kr-sj', 17],
                    ['kr-tj', 18], ['kr-ul', 19], ['kr-in', 20], ['kr-kw', 21],
                    ['kr-gn', 22], ['kr-cj', 23], ['kr-gb', 24], ['kr-so', 25],
                    ['kr-tg', 26], ['kr-kj', 27]
                ];

                setMapOptions({
                    chart: {
                        map: topology,
                    },
                    title: {
                        text: "KR population density (/km²)",
                    },
                    exporting: {
                        sourceWidth: 600,
                        sourceHeight: 500,
                    },
                    legend: {
                        layout: "horizontal",
                        borderWidth: 0,
                        backgroundColor: "rgba(255,255,255,0.85)",
                        floating: true,
                        verticalAlign: "top",
                        y: 25,
                    },
                    mapNavigation: {
                        enabled: true,
                    },
                    colorAxis: {
                        min: 1,
                        type: "logarithmic",
                        minColor: "#EEEEFF",
                        maxColor: "#000022",
                        stops: [
                            [0, "#EFEFFF"],
                            [0.67, "#4444FF"],
                            [1, "#000022"],
                        ],
                    },
                    series: [
                        {
                            accessibility: {
                                point: {
                                    valueDescriptionFormat:
                                        "{xDescription}, {point.value} people per square kilometer.",
                                },
                            },
                            animation: {
                                duration: 1000,
                            },
                            data: data,
                            joinBy: ["postal-code", "code"],
                            dataLabels: {
                                enabled: true,
                                color: "#FFFFFF",
                                format: "{point.code}",
                            },
                            name: "Population density",
                            tooltip: {
                                pointFormat: "{point.code}: {point.value}/km²",
                            },
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>highcharts</h1>
            <div id={"container"}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={initialOptions}/>
                <HighchartsReact
                    highcharts={HighchartsMap}
                    constructorType={'mapChart'}
                    options={mapOptions}/>
            </div>
        </>
    );
};
