"use client";

import React from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards/es-modules/masters/dashboards.src';
import '@highcharts/dashboards/es-modules/masters/modules/layout.src';
import DataGrid from '@highcharts/dashboards/datagrid';
import Row from '../../../_component/Row';

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const columnNames = ['NO', '지역 및 유형', '매출비용', '변동율'];
const data = [
    ['NO', '지역 및 유형', '매출비용', '변동율'],
    [1, '기업사업본부 / 동부기업사업팀 / 비즈 / 010 / 선택약정', 33333, 47.8],
    [2, '기업사업본부 / 동부기업사업팀 / 비즈 / 010 / 선택약정', 33333, 47.8],
    [3, '기업사업본부 / 동부기업사업팀 / 비즈 / 010 / 선택약정', 33333, 47.8],
    [4, '기업사업본부 / 동부기업사업팀 / 비즈 / 010 / 선택약정', 33333, 47.8],
    [5, '기업사업본부 / 동부기업사업팀 / 비즈 / 010 / 선택약정', 33333, 47.8]
];

const VariationFactor: React.FC = () => {

    const config = {
        dataPool: {
            connectors: [
                {
                    id: 'arpu-variation-factor-data',
                    type: 'JSON',
                    options: {
                        firstRowNames: false,
                        columnNames: columnNames,
                        data: data,
                    }
                }
            ],
        },
        gui: {
            layouts: [{
                rows: [
                    {
                        cells: [
                            { id: 'arpu-variation-factor' }
                        ]
                    }
                ]
            }],
        },
        components: [
            {
                cell: 'arpu-variation-factor',
                type: 'DataGrid',
                title: '유치ARPU 변동요인',
                connector: {
                    id: 'arpu-variation-factor-data',
                },
                sync: {
                    highlight: true,
                    visibility: true,
                }
            }
        ],
    };

    React.useEffect(() => {
        Dashboards.board('arpu-datagrid', config);
    }, []);

    return (
        <Row className="chart">
            <div id="arpu-datagrid" style={{ width: '700px' }}/>
        </Row>
    );
}

export default VariationFactor;
