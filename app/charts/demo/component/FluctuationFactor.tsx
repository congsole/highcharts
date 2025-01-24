"use client";

import Image from "next/image";
import React from 'react';
import Highcharts from 'highcharts';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
import askIcon from "@/public/icons/icon_ask.svg";

const FluctuationFactor: React.FC = () => {

    const chartOptions1: Highcharts.Options = {
        chart: {
            type: 'bar',
            height: 100,
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe'],
            title: {
                text: null
            },
            gridLineWidth: 0,
            lineWidth: 0,
            labels: {
                enabled: false,
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'MNO AI마케팅 / TDS온라인팀 / T world Direct / 기변 / 무약정',
                y: -10,
                // x: 100,
                align: 'low'
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0,
            min: 0,
            max: 1000,
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1990',
            data: [904]
        }]
    };
    const chartOptions2: Highcharts.Options = {
        chart: {
            type: 'bar',
            height: 100,
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe'],
            title: {
                text: null
            },
            gridLineWidth: 0,
            lineWidth: 0,
            labels: {
                enabled: false,
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'MNO AI마케팅 / TDS온라인팀 / T world Direct / 기변 / 선택약정',
                y: -10,
                // x: 100,
                align: 'low'
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0,
            min: 0,
            max: 1000,
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1990',
            data: [267]
        }]
    };
    const chartOptions3: Highcharts.Options = {
        chart: {
            type: 'bar',
            height: 100,
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe'],
            title: {
                text: null
            },
            gridLineWidth: 0,
            lineWidth: 0,
            labels: {
                enabled: false,
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'MNO AI마케팅 / 11번가팀 / T world Direct / 기변 / 선택약정',
                y: -10,
                // x: 100,
                align: 'low'
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0,
            min: 0,
            max: 1000,
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1990',
            data: [632]
        }]
    };
    const chartOptions4: Highcharts.Options = {
        chart: {
            type: 'bar',
            height: 100,
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe'],
            title: {
                text: null
            },
            gridLineWidth: 0,
            lineWidth: 0,
            labels: {
                enabled: false,
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '기업사업본부 / 수도권기업사업팀 / 비즈 / 기변 / 지원금약정',
                y: -10,
                // x: 100,
                align: 'low'
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0,
            min: 0,
            max: 1000,
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1990',
            data: [789]
        }]
    };
    const chartOptions5: Highcharts.Options = {
        chart: {
            type: 'bar',
            height: 100,
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['Africa', 'America', 'Asia', 'Europe'],
            title: {
                text: null
            },
            gridLineWidth: 0,
            lineWidth: 0,
            labels: {
                enabled: false,
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '제휴마케팅본부 / 제휴영업팀 / 특판 / MNP / 선택약정',
                y: -10,
                // x: 100,
                align: 'low'
            },
            labels: {
                enabled: false,
            },
            gridLineWidth: 0,
            min: 0,
            max: 1000,
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 1990',
            data: [333]
        }]
    };

    return (
        <div className="chart" style={{width: 650}}>
            <div style={{ display: "flex"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions1}
                />
                <Image src={askIcon} alt={"askIcon"}/>
            </div>
            <div style={{ display: "flex"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions2}
                />
                <Image src={askIcon} alt={"askIcon"}/>
            </div>
            <div style={{ display: "flex"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions3}
                />
                <Image src={askIcon} alt={"askIcon"}/>
            </div>
            <div style={{ display: "flex"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions4}
                />
                <Image src={askIcon} alt={"askIcon"}/>
            </div>
            <div style={{ display: "flex"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions5}
                />
                <Image src={askIcon} alt={"askIcon"}/>
            </div>
        </div>
    );
}

export default FluctuationFactor;
