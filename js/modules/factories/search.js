export function searchFactory () {

    function getSuggestionDOM(value) {
        const suggestion     = document.createElement( 'li' );
        suggestion.className = 'suggestion';

        const button         = document.createElement( 'button' );
        button.value         = value;
        button.innerText     = value;

        suggestion.appendChild(button);

        return suggestion;
    }

    function getTagDOM(data) {
        const {value, type} = data;

        const tag      = document.createElement('div');
        tag.className  = `tag tag_${type}`;

        const pTag     = document.createElement('p');
        pTag.innerText = value;

        const button   = document.createElement('button');
        
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