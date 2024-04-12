import { select } from 'd3';

export function createCircles(container, circleData) {
    const svg = select(container).append('svg');
    
    svg.selectAll('circle')
        .data(circleData)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => (i + 1) * (d.radius * 3)) // Adjust spacing between circles
        .attr('cy', d => d.radius * 2)
        .attr('r', d => d.radius)
        .attr('fill', d => d.color)

    svg.selectAll('text')
        .data(circleData)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i + 1) * (d.radius * 3)) // Same x-coordinate as circles
        .attr('y', d => d.radius * 2) // Same y-coordinate as circles
        .attr('text-anchor', 'middle') // Center text horizontally
        .attr('alignment-baseline', 'middle') // Center text vertically
        .text(d => d.label); // Set text content to label from circleData
}
