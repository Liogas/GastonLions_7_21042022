import { searchFactory } from "./factories/search.js";

/**
 * Get suggestion for advanced search
 * @param {Array} tabRecipes 
 * @returns {Array} suggestions
 */
export function getValueForAdvancedSearch(tabRecipes) {
    let suggestions = {
        ingredient : [],
        appliance : [],
        ustensil : []
    }
    tabRecipes.forEach((recipe) => {
        const {getSuggestionDOM} = searchFactory();
        recipe.ingredients.forEach((ingredient) => {
            if( !suggestions.ingredient.find(element => ingredient.ingredient.toLowerCase() === element.value.toLowerCase())) {
                suggestions.ingredient.push({value: ingredient.ingredient, DOMElement: getSuggestionDOM(ingredient.ingredient)});
            }
        });
        if( !suggestions.appliance.find(element => recipe.appliance.toLowerCase() === element.value.toLowerCase())) {
            suggestions.appliance.push({value: recipe.appliance, DOMElement: getSuggestionDOM(recipe.appliance)});
        }
        recipe.ustensils.forEach((ustensils) => {
            if ( !suggestions.ustensil.find(element => ustensils.toLowerCase() === element.value.toLowerCase())) {
                suggestions.ustensil.push({value: ustensils, DOMElement: getSuggestionDOM(ustensils)});
            }
        });
    });
    return suggestions; 
}

/**
 * 
 * @param {Array} suggestions 
 * @param {String} value 
 * @returns {Array}
 */
export function filterSuggestion(suggestions, value) {
    return suggestions.filter(suggestion => suggestion.value.toLowerCase().includes(value.toLowerCase()));
}

/**
 * Open advanced search with suggestions
 * @param {HTMLElement} searchBar 
 * @param {HTMLElement} contentDOM 
 * @param {Array} suggestions 
 */
export function openSuggestions(searchBar, contentDOM, suggestions) {
    searchBar.parentElement.parentElement.className = 'advanced_block open_all';
    contentDOM.innerHTML = '';
    suggestions = updateSuggestions(suggestions, searchBar.value, contentDOM);
}
/**
 * Close advanced search
 * @param {HTMLElement} parentElement 
 * @param {HTMLElement} contentDOM 
 */
export function closeSuggestions(parentElement, contentDOM) {
    parentElement.className = 'advanced_block close';
    contentDOM.innerHTML    = '';
}
/**
 * Update suggestions with the entry of user on advanced search
 * @param {Array} suggestions 
 * @param {String} value 
 * @param {HTMLElement} contentDOM 
 * @returns {Array} 
 */
export function updateSuggestions(suggestions, value, contentDOM) {
    suggestions = filterSuggestion(suggestions, value);
    contentDOM.innerHTML = '';
    suggestions.forEach(function(s){contentDOM.appendChild(s.DOMElement)});
    return suggestions;    
}
/**
 * Close other suggestions content
 * @param {HTMLElement} contentSuggestion1 
 * @param {HTMLElement} contentSuggestion2 
 */
export function closeOtherSuggestion(contentSuggestion1, contentSuggestion2) {
    contentSuggestion1.className = 'advanced_block close';
    contentSuggestion2.className = 'advanced_block close';
}
