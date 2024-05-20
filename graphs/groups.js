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
    const fontSizeFactor = window.innerHeight < 1000 ? .03 : .065;

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
            .attr('font-size', `${dimensions * .01 - d.length * fontSizeFactor}vw`)
            .attr('font-weight', '700')
            .classed('character-name', true)
            .text(d.replaceAll("_", " "));

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
            })

            .on('click', function (event) {
                showCharacterInfo(event, d);
            });
    });

    function showCharacterInfo(event, character) {
        // Remove any existing info-bubble
        d3.selectAll('.info-bubble').remove();

        // Get the viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the position for the bubble to be in the center of the viewport
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;

        // Create and style the info-bubble
        const bubble = d3.select('body').append('div')
            .attr('class', 'info-bubble')
            .style('position', 'fixed') // Use 'fixed' to position relative to the viewport
            .style('left', `${centerX}px`)
            .style('top', `${centerY}px`)
            .style('transform', 'translate(-50%, -50%)')
            .style('padding', '20px')
            .style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'white')
            .style('border-radius', '10px')
            .style('text-align', 'center')
            .style('max-width', '300px')
            .style('z-index', '1000')
            .html(`<h2>${character.replaceAll("_", " ")}</h2><p>${getCharacterInfo(character)}</p><button id="close-info-bubble">Fermer</button>`);

        // Add event listener to close the info-bubble
        d3.select('#close-info-bubble').on('click', function () {
            bubble.remove();
        });
    }



    function getCharacterInfo(character) {
        // Assuming there's a description field for each character in data
        return data.Crew[character]?.description || data.Enemies[character]?.description || "No information available.";
    }

    return svg.node();
}
