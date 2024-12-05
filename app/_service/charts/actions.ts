"use server";

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
