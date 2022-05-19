import {removeTag} from '../tag.js'

export function searchFactory () {

    /**
     * Generate HTMLElement suggestion
     * @param {String} value 
     * @returns {HTMLElement} suggestion
     */
    function getSuggestionDOM(value) {
        const suggestion     = document.createElement( 'li' );
        suggestion.className = 'suggestion';

        const button         = document.createElement( 'button' );
        button.value         = value;
        button.innerText     = value;

        suggestion.appendChild(button);

        return suggestion;
    }

    /**
     * Generate HTMLElement tag
     * @param {String} value 
     * @param {String} type 
     * @param {Array} tags 
     * @param {HTMLElement} contentDOM 
     * @returns {HTMLElement} tag
     */
    function getTagDOM(value, type, tags, contentDOM) {
        const tag      = document.createElement('div');
        tag.className  = `tag tag_${type}`;

        const pTag     = document.createElement('p');
        pTag.innerText = value;

        const button   = document.createElement('button');
        button.addEventListener('click', function() {
            removeTag(tag, value, tags, contentDOM);
        });
        
        const img      = document.createElement('img');
        img.src        = './img/cross.png';
        img.alt        = 'delete';

        button.appendChild(img);

        tag.appendChild(pTag);
        tag.appendChild(button);

        return tag;
    }

    return {getSuggestionDOM, getTagDOM};
}