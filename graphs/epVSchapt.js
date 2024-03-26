// circle.js
import { select, scaleLinear, max } from 'd3';

export function createBarChart(container, data) {
    // Define the width and height of the SVG container
    const width = 100;
    const height = 100;

    // Create an SVG element
    const svg = select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Extract the maximum value from the data
    const maxValue = max(data);

    // Create a scale for the y-axis based on the maximum value
    const yScale = scaleLinear()
        .domain([0, maxValue])
        .range([height, 0]);

    // Create a scale for the x-axis
    const xScale = scaleLinear()
        .domain([0, data.length])
        .range([0, width]);

    // Create and append rectangles for each data point
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', width / data.length - 1) // Adjust width of each bar
        .attr('height', d => height - yScale(d))
        .attr('fill', 'steelblue');

    // Add data labels inside each bar
    svg.selectAll(".datalabel")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "datalabel")
        .attr("x", (d, i) => xScale(i) + (width / data.length - 1) / 2)
        .attr("y", d => yScale(d) + 20) // Adjust vertical position of label
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .text(d => d);
}
