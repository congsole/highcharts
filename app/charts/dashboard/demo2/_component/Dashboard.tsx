"use client";

import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
// import Dashboards from '@highcharts/dashboards';
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
                    <Cell id="kpi-vitamin-a" />
                    <Cell id="kpi-iron" />
                </div>
                <Cell id="dashboard-col-0" />
                <Cell id="dashboard-col-1" />
            </Row>
            <Row>
                <Cell id="dashboard-col-2" />
            </Row>
        </div>
    );
}
