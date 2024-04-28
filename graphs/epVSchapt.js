// https://observablehq.com/@d3/donut-chart/2?intent=fork

import * as d3 from 'd3';

export function epVsChapChart(arcData) {
    const width = 300;
    const height = Math.min(width, 500);
    const radius = Math.min(width, height) / 2;

    const arcsData = [
        { name: "Chapitres", value: arcData.Chapitres },
        { name: "Episodes", value: arcData.Episodes }
    ];

    const arc = d3.arc()
        .innerRadius(radius * 0.67)
        .outerRadius(radius - 1);

    const pie = d3.pie()
        .padAngle(1 / radius)
        .sort(null)
        .value(d => d.value);

    const color = d3.scaleOrdinal()
        .domain(arcsData.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), arcsData.length).reverse());

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;")
        .classed("chapVsEps", true);

    svg.append("g")
        .selectAll()
        .data(pie(arcsData))
        .join("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)
        .text(d => `${d.data.name}: ${d.data.value}`);

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 25)
        .attr("text-anchor", "middle")
        .selectAll()
        .data(pie(arcsData))
        .join("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.3em")
            .text(d => d.data.value.toLocaleString("en-US")));

    // Add text label in the center of the pie chart
    svg.append("text")
        .attr("font-size", 30)
        .attr("fill", color("Episodes"))
        .attr("text-anchor", "middle")
        .attr("dy", "-0.8em")
        .text("Episodes");

    svg.append("text")
        .attr("font-size", 30)
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dy", "0.5em")
        .text("VS");

    svg.append("text")
        .attr("font-size", 30)
        .attr("fill", color("Chapitres"))
        .attr("text-anchor", "middle")
        .attr("dy", "1.8em")
        .text("Chapitres");

    return svg.node();
}
