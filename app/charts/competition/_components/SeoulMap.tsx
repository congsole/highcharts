"use client";

import React from "react";
import Highcharts from "highcharts/highmaps";
import HighchartsExporting from 'highcharts/modules/exporting';
import dynamic from 'next/dynamic';
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {ssr: false});
// import seoulGeoJSON from "../../../../public/geoJSON/seoulGeo.json";
import HighchartsMore from "highcharts/highcharts-more";
import { getSidoGeoJson } from "@app/_service/charts/actions";

interface MapData {
    code: string;
    value: number;
}

const mapData: MapData[] = [
    { code: "11010", value: 10 }, // 종로구
    { code: "11020", value: 20 }, //
    { code: "11030", value: 30 }, //
    { code: "11040", value: 40 }, //
    { code: "11050", value: 50 }, //
    { code: "11060", value: 60 }, //
    { code: "11070", value: 70 }, //
    { code: "11080", value: 80 }, //
    { code: "11090", value: 80 }, //
    { code: "11100", value: 100 }, //
    { code: "11110", value: 15 }, //
    { code: "11120", value: 25 }, //
    { code: "11130", value: 35 }, //
    { code: "11140", value: 45 }, //
    { code: "11150", value: 55 }, //
    { code: "11160", value: 65 }, //
    { code: "11170", value: 0 }, //
    { code: "11180", value: 0 }, //
    { code: "11190", value: 0 }, //
    { code: "11200", value: 0 }, //
    { code: "11210", value: 13 }, //
    { code: "11220", value: 23 }, //
    { code: "11230", value: 33 }, //
    { code: "11240", value: 43 }, //
    { code: "11250", value: 53 }, //
];

const SeoulMap: React.FC = () => {
    const [seoulGeoJSON, setSeoulGeoJSON] = React.useState(null);

    // Highcharts 모듈 초기화
    React.useEffect(() => {
        if (typeof Highcharts === "object") {
            HighchartsMore(Highcharts);
            HighchartsExporting(Highcharts);
        }
    }, []);

    // GeoJSON 데이터를 비동기로 가져오기
    React.useEffect(() => {
        const fetchGeoJSON = async () => {
            const geoJSON = await getSidoGeoJson(11); // 서울 GeoJSON 가져오기
            setSeoulGeoJSON(geoJSON);
        };
        fetchGeoJSON();
    }, []);

    // 데이터가 로드되기 전에는 로딩 표시
    if (!seoulGeoJSON) {
        return <div>Loading...</div>;
    }

    const chartOptions: Highcharts.Options = {
        chart: {
            // map: "seoul", // GeoJSON 키 사용
        },
        title: {
            text: "서울",
            align: "left",
            margin: 30,
        },
        subtitle: {
            text: "시군구별 데이터",
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: "bottom",
            },
        },
        colorAxis: {
            min: 0,
            max: 100, // 데이터 최대값에 맞춰 설정
            stops: [
                [0, "#ffffff"], // 최소값
                [0.5, "rgba(255,0,0,0.31)"], // 중간값
                [1, "#ff0000"], // 최대값
            ],
        },
        series: [
            {
                type: "map",
                name: "서울 시군구 데이터",
                data: mapData, // 데이터 매핑
                mapData: seoulGeoJSON, // 로드된 GeoJSON
                joinBy: ["SIGUNGU_CD", "code"], // mapData 코드, data 코드 간 매핑
                states: {
                    hover: {
                        color: "#a4edba", // 마우스 오버 색상
                    },
                },
                dataLabels: {
                    enabled: true,
                    format: "{point.properties.SIGUNGU_NM}", // 시군구 이름 표시
                },
            },
        ],
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            constructorType={"mapChart"}
        />
    );
};

export default SeoulMap;