import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';
import styled from 'styled-components';
import '../../../style/chart.css'; // وارد کردن فایل CSS



export const OrgChartComponent = (props) => {
    const d3Container = useRef(null);
    let chart = null;

    const addNode = (node) => {
        chart.addNode(node);
    };

    props.setClick(addNode);

    useLayoutEffect(() => {
        if (props.data && d3Container.current) {
            if (!chart) {
                chart = new OrgChart();
            }
            chart
                .container(d3Container.current)
                .data(props.data)
                .nodeWidth(() => 200)
                .nodeHeight(() => 90)
                .onNodeClick((d) => {
                    props.onNodeClick(d);
                })
                .buttonContent(({ node }) => {
                    return `<div class="node-button">
                    <span style="font-size:9px ">
                    ${node.children ? `<i class="fas fa-angle-up"></i>` : `<i class="fas fa-angle-down"></i>`}
                    </span> 
                    ${node.data._directSubordinates} 
                    </div>`;
                })
                .nodeContent((d) => {
                    return `
                    <div class="node-content" style="width:${100}%;height:${100}%;">
                        <div class="node-image-wrapper"></div>
                        <img class="node-image" src="${d.data.imageUrl}" />
                        <div class="node-options">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                        <div class="node-name">${d.data.name}</div>
                        <div class="node-position">${d.data.positionName}</div>
                    </div>`;
                })
                .render();
        }
    }, [props.data]);

    return (
            <div ref={d3Container} />
    );
};
