"use client";

import React from 'react';
import Highcharts from 'highcharts';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
import Treemap from 'highcharts/modules/treemap';

interface Depth_1 {
    id: string;
    name: string;
    color: string;
}

interface Depth_2 {
    id: string;
    name: string;
    value: number;
    parent: string;
}

const depth_1: Depth_1[] = [
    {
        id: 'id_0',
        name: '수도권',
        color: '#d568fb',
    },
    {
        id: 'id_1',
        name: 'PS&M',
        color: '#2caffe',
    },
    {
        id: 'id_2',
        name: '제휴마케팅본부',
        color: '#544fc5',
    },
    {
        id: 'id_3',
        name: '부산',
        color: '#00e272',
    },
    {
        id: 'id_4',
        name: '기업사업본부',
        color: '#fe6a35',
    },
];
const depth_2: Depth_2[] = [
    // parent: id_0 (수도권)
    {
        id: 'id_0_0',
        name: '중앙마케팅팀',
        parent: 'id_0',
        value: 107041865185,
    },
    {
        id: 'id_0_1',
        name: '강북마케팅팀',
        parent: 'id_0',
        value: 87130492850,
    },
    {
        id: 'id_0_2',
        name: '강서마케팅팀',
        parent: 'id_0',
        value: 67584237013,
    },
    {
        id: 'id_0_3',
        name: '강동마케팅팀',
        parent: 'id_0',
        value: 65517444232,
    },
    {
        id: 'id_0_4',
        name: '수원마케팅팀',
        parent: 'id_0',
        value: 40165406273,
    },
    {
        id: 'id_0_5',
        name: '강남마케팅팀',
        parent: 'id_0',
        value: 50760673333,
    },
    {
        id: 'id_0_6',
        name: '강원마케팅팀',
        parent: 'id_0',
        value: 18813999999,
    },
    //
    {
        id: 'id_1_0',
        name: '중앙마케팅팀',
        parent: 'id_1',
        value: 57041865185,
    },
    {
        id: 'id_1_1',
        name: '강북마케팅팀',
        parent: 'id_1',
        value: 43130492850,
    },
    {
        id: 'id_1_2',
        name: '강서마케팅팀',
        parent: 'id_1',
        value: 34584237013,
    },
    {
        id: 'id_1_3',
        name: '강동마케팅팀',
        parent: 'id_1',
        value: 33517444232,
    },
    {
        id: 'id_1_4',
        name: '수원마케팅팀',
        parent: 'id_1',
        value: 20165406273,
    },
    {
        id: 'id_1_5',
        name: '강남마케팅팀',
        parent: 'id_1',
        value: 25760673333,
    },
    {
        id: 'id_1_6',
        name: '강원마케팅팀',
        parent: 'id_1',
        value: 2913999999,
    },
    //
    {
        id: 'id_2_0',
        name: '중앙마케팅팀',
        parent: 'id_2',
        value: 28041865185,
    },
    {
        id: 'id_2_1',
        name: '강북마케팅팀',
        parent: 'id_2',
        value: 21130492850,
    },
    {
        id: 'id_2_2',
        name: '강서마케팅팀',
        parent: 'id_2',
        value: 17584237013,
    },
    {
        id: 'id_2_3',
        name: '강동마케팅팀',
        parent: 'id_2',
        value: 16517444232,
    },
    {
        id: 'id_2_4',
        name: '수원마케팅팀',
        parent: 'id_2',
        value: 10165406273,
    },
    {
        id: 'id_2_5',
        name: '강남마케팅팀',
        parent: 'id_1',
        value: 25760673333,
    },
    {
        id: 'id_2_6',
        name: '강원마케팅팀',
        parent: 'id_1',
        value: 9813999999,
    },
];

const RbSum: React.FC = () => {
    if (typeof Highcharts === 'object') {
        Treemap(Highcharts);
    }

    // const [model, setModel] = React.useState("전체");


    const chartOptions: Highcharts.Options = {
        title: {
            text: '유치단가 총계',
            align: 'left',
        },
        series: [{
            name: '조직',
            type: 'treemap',
            layoutAlgorithm: "sliceAndDice",
            allowDrillToNode: true,
            animationLimit: 1000,
            borderWidth: 0,
            dataLabels: {
                enabled: false
            },
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 3,
                // levelIsConstant: false
            }, {
                level: 1,
                dataLabels: {
                    style: {
                        fontSize: '14px'
                    }
                }
            }],
            accessibility: {
                exposeAsGroupOnly: true
            },
            data: [...depth_1, ...depth_2],
        }],
    };

    return (<>
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    </>);
}

export default RbSum;
