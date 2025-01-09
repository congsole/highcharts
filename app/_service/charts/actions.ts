"use server";

import sigunguGeoJson from "@public/geoJSON/BND_SIGUNGU_PG_202306.json";

const sidoCode = {
    11: "서울특별시",
    21: "부산광역시",
    22: "대구광역시",
    23: "인천광역시",
    24: "광주광역시",
    25: "대전광역시",
    26: "울산광역시",
    29: "세종특별자치시",
    31: "경기도",
    32: "강원특별자치도",
    33: "충청북도",
    34: "충청남도",
    35: "전라북도",
    36: "전라남도",
    37: "경상북도",
    38: "경상남도",
    39: "제주특별자치도",
}

export async function getTopology() {
    const topology = await fetch(
        "https://code.highcharts.com/mapdata/countries/kr/kr-all.topo.json",
    ).then((response) => response.json());
    return topology;
}

export async function getData() {
    const data = fetch(
        "https://www.highcharts.com/samples/data/kr-population-density.json",
    ).then((response) => response.json());
    return data;
}

export async function getSidoGeoJson(sidoCode: number) {
    const filteredGeoJson = {
        type: "FeatureCollection",
        features: sigunguGeoJson.features.filter(object => object.properties.SIGUNGU_CD.startsWith(sidoCode.toString())),
    }
    console.log(filteredGeoJson.features[0].properties);
    return filteredGeoJson;
}