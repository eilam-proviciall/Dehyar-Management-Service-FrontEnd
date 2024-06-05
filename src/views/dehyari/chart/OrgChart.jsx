import React, { useLayoutEffect, useRef, useState } from 'react';
import { OrgChart } from 'd3-org-chart';
import '../../../style/chart.css';
export const OrgChartComponent = (props) => {
    const d3Container = useRef(null);
    const [chart, setChart] = useState(null);

    const addNode = (node) => {
        chart.addNode(node);
    };

    props.setClick(addNode);

    useLayoutEffect(() => {
        if (props.data && d3Container.current) {
            const newChart = new OrgChart();
            setChart(newChart);
            newChart
                .container(d3Container.current)
                .data(props.data)
                .nodeWidth(() => 200)
                .nodeHeight(() => 90)
                .onNodeClick((node) => {
                    `${node.data._directSubordinates}`;
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
        <>
            <div ref={d3Container} className="chart-container" />
        </>
    );
};
