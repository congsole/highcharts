"use client";

import React from 'react';
import Row from "@app/charts/_component/Row";
import Cell from "@app/charts/_component/Cell";
import Sales from "@app/charts/aimarket/sales-performance-analysis/wireless-sales/component/Sales";
import MultiSelectFilter from "@app/charts/_component/MultiSelectFilter";

const channel = ['도매', '소매', '020', 'TWF', '방판', '온라인', '특판', '기타', '기업', 'T world Direct', '대형특수', '비즈', '외부유통망', '홈쇼핑'];
const joinType = ['010', 'MNP', '기변'];
const terminalType = ['핸드셋', '데이터셰어링', '2ND 디바이스', '태블릿', '기타'];
const region = ['수도권', 'PS&M', '제휴마케팅본부', '기업사업본부', '부산', 'MNO AI마케팅', '서부', '대구', '중부', '제주'];
const date = ['2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04', '2024-12-05', '2024-12-06', '2024-12-07', '2024-12-08', '2024-12-09', '2024-12-10', '2024-12-11', '2024-12-12', '2024-12-13', '2024-12-14', '2024-12-15',];
const cell = ['갤럭시 WIDE7', '갤럭시 S24', '아이폰16 PRO', '갤럭시 S24 울트라', '갤럭시퀀텀5', '아이폰15', '아이폰15 PRO', '아이폰16 PRO MAX', '갤럭시 A15', '갤럭시 A05', '갤럭시 A35', '아이폰14'];
const discountType = ['선택약정', '지원금약정', null];
const MNPbyBusiness = ['KT', 'MVNO', 'LG U+'];

function createRandomData(number: number) {
    const data = [];
    for (let i = 0; i < number; i++) {
        const joinTypeValue = joinType[Math.floor(Math.random() * joinType.length)];
        data.push(
            {
                channel: channel[Math.floor(Math.random() * channel.length)],
                joinType: joinTypeValue,
                terminalType: terminalType[Math.floor(Math.random() * terminalType.length)],
                region: region[Math.floor(Math.random() * region.length)],
                date: date[Math.floor(Math.random() * date.length)],
                cell: cell[Math.floor(Math.random() * cell.length)],
                discountType: discountType[Math.floor(Math.random() * discountType.length)],
                MNPbyBusiness: joinTypeValue === 'MNP' ? MNPbyBusiness[Math.floor(Math.random() * MNPbyBusiness.length)] : null,
            }
        );
    }
    console.log("raw data created");
    return data;
}

const createdData = createRandomData(20000);

export default function Page() {

    const [channelFilter, setChannelFilter] = React.useState([]);
    const [joinFilter, setJoinFilter] = React.useState([]);
    const [terminalFilter, setTerminalFilter] = React.useState([]);
    const [data, setData] = React.useState(createdData);

    React.useEffect(() => {
        console.log(channelFilter);
        const filteredData = createdData.filter((d) => {
            let isChannelFiltered = true;
            let isJoinFiltered = true;
            let isTerminalFiltered = true;
            if (channelFilter.length > 0) {
                isChannelFiltered = channelFilter.some(cnl => cnl === d.channel);
            }
            if (joinFilter.length > 0) {
                isJoinFiltered = joinFilter.some(jn => jn === d.joinType);
            }
            if (terminalFilter.length > 0) {
                isTerminalFiltered = terminalFilter.some(tmnl => tmnl === d.terminalType);
            }
            return isChannelFiltered && isJoinFiltered && isTerminalFiltered;
        });
        setData(filteredData);
    }, [channelFilter, joinFilter, terminalFilter]);


    return (
        <>
            <div id={"container"}>
                <Row>
                    <h2 className="highcharts-dashboards-component-title">무선판매</h2>
                    <MultiSelectFilter filterName={"채널 유형"} filterOptions={channel} selectedItems={channelFilter} setSelectedItems={setChannelFilter} />
                    <MultiSelectFilter filterName={"가입 유형"} filterOptions={joinType} selectedItems={joinFilter} setSelectedItems={setJoinFilter} />
                    <MultiSelectFilter filterName={"단말 유형"} filterOptions={terminalType} selectedItems={terminalFilter} setSelectedItems={setTerminalFilter} />
                </Row>
                <Row>
                    <Cell width="1600px"><Sales data={data} region={region} date={date} cell={cell}/></Cell>
                </Row>
            </div>
        </>
    );
};
