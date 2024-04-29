import * as d3 from 'd3';
import data from "../data/characters.json";

const spacing = 30;
const border = 2;

export function createGroup(characters) {
    // Filter characters based on the input array
    const filteredCharacters = characters.filter(character => data.Crew[character] || data.Enemies[character]);

    const dimensions = Math.min(window.innerHeight / filteredCharacters.length - spacing, 200);
    console.log(dimensions);

    // Create SVG container
    const svg = d3.select('body')
        .append('svg')
        .attr('height', filteredCharacters.length * (dimensions + spacing) - spacing)
        .attr('width', (dimensions + border))
        .classed("characters", true);

    // Define radial gradient
    const gradient = svg.append('defs')
        .append('radialGradient')
        .attr('id', 'radial-gradient')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%')
        .attr('fx', '50%')
        .attr('fy', '50%');

    gradient.append('stop')
        .attr('offset', '50%')
        .style('stop-color', '#fff');

    gradient.append('stop')
        .attr('offset', '100%')
        .style('stop-color', '#57cae7');

    // Create circles and images for each character
    const charactersGroup = svg.selectAll('.character')
        .data(filteredCharacters)
        .enter()
        .append('g')
        // .classed('circle', true)
        .attr('transform', (d, i) => `translate(${(dimensions + border) / 2}, ${dimensions / 2 + i * (dimensions + spacing)})`);

    // Add circles for gradient fill
    charactersGroup.append('circle')
        .attr('r', dimensions / 2)
        .style('stroke', 'black')
        .style('stroke-width', border)
        .style('fill', 'url(#radial-gradient)')
        .on('click', d => {
            console.log(`${d} clicked`);
            // You can add custom functionality here
        });

    // Add images to circles
    charactersGroup.each(function (d) {
        const group = d3.select(this);
        const imageUrl = `./img/characters/${d.toLowerCase()}.png`;

        // Define unique pattern ID for each character
        const patternId = `${d.toLowerCase()}-pattern`;

        // Create pattern
        svg.append('defs')
            .append('pattern')
            .attr('id', patternId)
            .attr('width', 1)
            .attr('height', 1)
            .append('image')
            .attr('xlink:href', imageUrl)
            .attr('width', dimensions - 20)
            .attr('height', dimensions - 20)
            .attr('x', 10)
            .attr('y', 10);

        // Append image to the group
        group.append('circle')
            .attr('r', dimensions / 2)
            .style('fill', () => `url(#${patternId})`)
            .classed('character', true);
    });

    return svg.node();
}
