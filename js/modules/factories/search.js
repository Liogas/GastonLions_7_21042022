export function searchFactory () {

    function getAllSuggestions(value) {
        const suggestion = document.createElement( 'li' );
        suggestion.className = 'suggestion';

        const button = document.createElement( 'button' );
        button.value = value;
        button.innerText = value;

        suggestion.appendChild(button);

        return suggestion;
    }

    return {getAllSuggestions};
}