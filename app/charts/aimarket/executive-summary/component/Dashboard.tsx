"use client";

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards/es-modules/masters/dashboards.src';
import '@highcharts/dashboards/es-modules/masters/modules/layout.src';
import DataGrid from '@highcharts/dashboards/datagrid';
import Row from '../../../_component/Row';
import Cell from '../../../_component/Cell';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

export default function Dashboard(props) {
    const { config } = props;

    useEffect(() => {
        Dashboards.board('container', config);
    }, [config]);

    return (
        <div id="container">
            <Row>
                <div id="kpi-wrapper">
                    <Cell className="kpi" id="kpi-sales" />
                    <Cell className="kpi" id="kpi-mnp" />
                    <Cell className="kpi" id="kpi-averate-rb" />
                    <Cell className="kpi" id="kpi-arpu" />
                </div>
            </Row>
            <Row>
                <div className="line-wrapper">
                    <div className="line-wrapper-row">
                        <Cell className="line" id="line-handset"/>
                        <div className="line-wrapper">
                            <p className="text-xs">제휴마케팅본부 / 제휴영업팀 / 특판 / MNP / 지원금약정</p>
                            <div className="line-wrapper-row">
                                <Cell className="kpi2" id="line-handset-kpi"/>
                                <Cell className="kpi2" id="line-handset-kpi2"/>
                            </div>
                            <p className="text-xs">MNO AI마케팅 / TDS온라인팀 / T world Direct / 기변 / 무약정</p>
                            <div className="line-wrapper-row">
                                <Cell className="kpi2" id="line-handset-kpi3"/>
                                <Cell className="kpi2" id="line-handset-kpi4"/>
                            </div>
                        </div>
                    </div>
                    <div className="line-wrapper-row">
                        <Cell className="line" id="line-mnp-in"/>
                        <div className="line-wrapper">
                            <p className="text-xs">제휴마케팅본부 / 제휴영업팀 / 특판 / MNP / 지원금약정</p>
                            <div className="line-wrapper-row">
                                <Cell className="kpi2" id="line-mnp-kpi1"/>
                                <Cell className="kpi2" id="line-mnp-kpi2"/>
                            </div>
                            <p className="text-xs">MNO AI마케팅 / TDS온라인팀 / T world Direct / 기변 / 무약정</p>
                            <div className="line-wrapper-row">
                                <Cell className="kpi2" id="line-mnp-kpi3"/>
                                <Cell className="kpi2" id="line-mnp-kpi4"/>
                            </div>
                        </div>
                    </div>
                    <div className="line-wrapper-row">
                        <Cell className="line" id="line-rb"/>
                        <div className="line-wrapper">

                        <p className="text-xs">제휴마케팅본부 / 제휴영업팀 / 특판 / MNP / 지원금약정</p>
                        <div className="line-wrapper-row">
                            <Cell className="kpi2" id="line-rb-kpi1"/>
                            <Cell className="kpi2" id="line-rb-kpi2"/>
                        </div>
                        <p className="text-xs">MNO AI마케팅 / TDS온라인팀 / T world Direct / 기변 / 무약정</p>
                        <div className="line-wrapper-row">
                            <Cell className="kpi2" id="line-rb-kpi3"/>
                            <Cell className="kpi2" id="line-rb-kpi4"/>
                        </div>

                        </div>
                    </div>
                    <div className="line-wrapper-row">
                        <Cell className="line" id="line-arpu"/>
                        <div className="line-wrapper">

                        <p className="text-xs">제휴마케팅본부 / 제휴영업팀 / 특판 / MNP / 지원금약정</p>
                        <div className="line-wrapper-row">
                            <Cell className="kpi2" id="line-arpu-kpi1"/>
                            <Cell className="kpi2" id="line-arpu-kpi2"/>
                        </div>
                        <p className="text-xs">MNO AI마케팅 / TDS온라인팀 / T world Direct / 기변 / 무약정</p>
                        <div className="line-wrapper-row">
                            <Cell className="kpi2" id="line-arpu-kpi3"/>
                            <Cell className="kpi2" id="line-arpu-kpi4"/>
                        </div>

                        </div>
                    </div>
                </div>
                <Cell id="dashboard-col-2"/>
            </Row>
        </div>
    );
}
