import * as d3 from 'd3';
import data from "../data/characters.json";
import { findParentKey } from '../modules/jsonFunctions';

const spacing = 30;
const border = 3;
const animationDuration = 200;

export function createGroup(characters) {
    // Filter characters based on the input array
    const filteredCharacters = characters.filter(character => data.Crew[character] || data.Enemies[character]);

    const dimensions = Math.min(window.innerHeight / filteredCharacters.length - spacing, 200);

    // Create SVG container
    const svg = d3.select('body')
        .append('svg')
        .attr('height', filteredCharacters.length * (dimensions + spacing) - spacing + border * 2)
        .attr('width', (dimensions + border));

    // Define allies radial gradient
    const alliesGradient = svg.append('defs')
        .append('radialGradient')
        .attr('id', 'radial-gradient-allies')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%')
        .attr('fx', '50%')
        .attr('fy', '50%');

    alliesGradient.append('stop')
        .attr('offset', '50%')
        .style('stop-color', '#fff');

    alliesGradient.append('stop')
        .attr('offset', '100%')
        .style('stop-color', '#57cae7');

    // Define enemies radial gradient
    const enemiesGradient = svg.append('defs')
        .append('radialGradient')
        .attr('id', 'radial-gradient-enemies')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%')
        .attr('fx', '50%')
        .attr('fy', '50%');

    enemiesGradient.append('stop')
        .attr('offset', '50%')
        .style('stop-color', '#fff');

    enemiesGradient.append('stop')
        .attr('offset', '100%')
        .style('stop-color', '#d24444');

    // Create circles and images for each character
    const charactersGroup = svg.selectAll('.character')
        .data(filteredCharacters)
        .enter()
        .append('g')
        .classed('character', true)
        .attr('transform', (d, i) => `translate(${(dimensions + border) / 2}, ${dimensions / 2 + border + i * (dimensions + spacing)})`);

    charactersGroup.each(function (d) {
        const group = d3.select(this);

        // Add circles for gradient fill
        const gradient = group.append('circle')
            .attr('r', dimensions / 2)
            .style('fill', () => {
                const team = findParentKey(data, d);
                return team == "Crew" ? 'url(#radial-gradient-allies)' : 'url(#radial-gradient-enemies)';
            })
            .style('filter', 'brightness(100%)');

        // Add images to circles
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
            .attr('width', dimensions)
            .attr('height', dimensions);
        // .attr('x', 15)
        // .attr('y', 15);

        // Append image to the group
        const image = group.append('circle')
            .attr('r', dimensions / 2)
            .style('stroke', 'white')
            .style('stroke-width', border)
            .style('fill', () => `url(#${patternId})`)
            .style('filter', 'brightness(100%)');

        // Add text in the center of the circle
        const text = group.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em') // Center the text vertically
            .attr('fill', 'white')
            .attr('font-size', `${dimensions * .01 - d.length * .03}vw`)
            .attr('font-weight', '700')
            .classed('character-name', true)
            .text(d.replaceAll("_", " "));

        console.log(d.replaceAll("_", " ").length);

        // Mouse event handling for showing/hiding text
        group.on('mouseenter', function () {
            text.transition().duration(animationDuration).style('opacity', 1); // Show text with transition
            gradient.transition().duration(animationDuration).style('filter', 'brightness(40%)');
            image.transition().duration(animationDuration).style('filter', 'brightness(40%)');
        })
            .on('mouseleave', function () {
                text.transition().duration(animationDuration).style('opacity', 0); // Hide text with transition
                gradient.transition().duration(animationDuration).style('filter', 'brightness(100%)');
                image.transition().duration(animationDuration).style('filter', 'brightness(100%)');
            });
    })

    return svg.node();
}
