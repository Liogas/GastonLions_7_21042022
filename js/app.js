import { addTag} from './modules/tag.js';
import { getValueForAdvancedSearch,  openSuggestions, closeSuggestions, updateSuggestions, closeOtherSuggestion} from "./modules/suggestion.js";
import { filterRecipes, displayCardRecipe} from './modules/recipe.js'

// Import datas of recipes
import recipes from "./modules/data/recipes.js";

/* DOM CONTENT */ 
const mainSearchBar = document.getElementById('main_search_bar');
const tagBlock      = document.getElementById('tag_block');
const resultBlock   = document.getElementById('result_block');

// DOM Elements for ingredient suggestions
const suggestionIngredientsDOM     = document.getElementById('ingredients_suggestions');
const btnCloseIngredientSuggestion = document.getElementById('close_ingredients_suggestions');
const ingredientSearchBarDOM       = document.getElementById('ingredients_searchBar');

// DOM Elements for appliances suggestions
const suggestionAppliancesDOM      = document.getElementById('appliances_suggestions');
const btnCloseAppliancesSuggestion = document.getElementById('close_appliances_suggestions');
const applianceSearchBarDOM        = document.getElementById('appliances_searchBar');

// DOM Elements for ustensils suggestions
const suggestionUstensilsDOM      = document.getElementById('ustensils_suggestions');
const btnCloseUstensilsSuggestion = document.getElementById('close_ustensils_suggestions');
const ustensilSearchBarDOM        = document.getElementById('ustensils_searchBar');


let tags = {
    ingredient : [],
    appliance  : [],
    ustensil   : []
};
let tabRecipes = [... recipes];

// suggestion = { ingredient : [], appliance : [], ustensil : [] }
let suggestions = getValueForAdvancedSearch(tabRecipes);

displayCardRecipe(resultBlock, tabRecipes);


export function filter(value) {
    const resultFilter = filterRecipes(value, recipes, tabRecipes, tags, suggestions); 
    tabRecipes = resultFilter.tabRecipes;
    suggestions = resultFilter.suggestions;
    displayCardRecipe(resultBlock, tabRecipes);
}

/**
 * Task suggestion when the user click on them
 * @param {String} type 
 */
function eventClickSuggestion(type) {
    const suggestionDOM = document.getElementsByClassName('suggestion');
    for(let i=0; i<suggestionDOM.length;i++) {
        suggestionDOM[i].firstElementChild.addEventListener('click', function() { 
            addTag(suggestionDOM[i].textContent, type, tags, tagBlock);
            if(type === 'ingredient') {
                closeSuggestions(document.getElementById('ingredients_block'), suggestionIngredientsDOM);
            } else if(type === 'appliance') {
                closeSuggestions(document.getElementById('appliances_block'), suggestionAppliancesDOM);
            } else if(type === 'ustensil') {
                closeSuggestions(document.getElementById('ustensils_block'), suggestionUstensilsDOM);
            }
           filter(mainSearchBar.value);
        });
    }
}

// EVENT LISTENER

mainSearchBar.addEventListener('input', function(e) {
    filter(e.target.value);
}); 

// entry user on advanced search
ingredientSearchBarDOM.addEventListener('input', function(e){
    suggestions.ingredient = getValueForAdvancedSearch(tabRecipes).ingredient;
    suggestions.ingredient = updateSuggestions(suggestions.ingredient, e.target.value, suggestionIngredientsDOM);
    eventClickSuggestion('ingredient');
});
applianceSearchBarDOM.addEventListener('input', function(e){
    suggestions.appliance = getValueForAdvancedSearch(tabRecipes).appliance;
    updateSuggestions(suggestions.appliance, e.target.value, suggestionAppliancesDOM);
});
ustensilSearchBarDOM.addEventListener('input', function(e){
    suggestions.ustensil = getValueForAdvancedSearch(tabRecipes).ustensil;
    updateSuggestions(suggestions.ustensil, e.target.value, suggestionUstensilsDOM);
})

// open suggestions of advanced search
ingredientSearchBarDOM.parentElement.addEventListener('click', function() {
    if(!(ingredientSearchBarDOM.parentElement.parentElement.className === 'advanced_block open_all')) {
        closeOtherSuggestion(applianceSearchBarDOM.parentElement.parentElement, ustensilSearchBarDOM.parentElement.parentElement);
        suggestions.ingredient = updateSuggestions(suggestions.ingredient, ingredientSearchBarDOM.value, suggestionIngredientsDOM);
        openSuggestions(ingredientSearchBarDOM, suggestionIngredientsDOM, suggestions.ingredient);
        eventClickSuggestion('ingredient');
    }
});
ustensilSearchBarDOM.parentElement.addEventListener('click', function() {
    if(!(ustensilSearchBarDOM.parentElement.parentElement.className === 'advanced_block open_all')) {
        closeOtherSuggestion(applianceSearchBarDOM.parentElement.parentElement, ingredientSearchBarDOM.parentElement.parentElement);
        suggestions.ustensil = updateSuggestions(suggestions.ustensil, ustensilSearchBarDOM.value, suggestionUstensilsDOM);
        openSuggestions(ustensilSearchBarDOM, suggestionUstensilsDOM, suggestions.ustensil);
        eventClickSuggestion('ustensil');
    }
});
applianceSearchBarDOM.parentElement.addEventListener('click', function() {
    if(!(applianceSearchBarDOM.parentElement.parentElement.className === 'advanced_block open_all')) {
        closeOtherSuggestion(ingredientSearchBarDOM.parentElement.parentElement, applianceSearchBarDOM.parentElement.parentElement);
        openSuggestions(applianceSearchBarDOM, suggestionAppliancesDOM, suggestions.appliance);
        eventClickSuggestion('appliance');
    }
});

// close suggestion of advanced search
btnCloseIngredientSuggestion.addEventListener('click', function(e) {
    e.stopPropagation(); 
    closeSuggestions(btnCloseIngredientSuggestion.parentElement.parentElement, suggestionIngredientsDOM);
});
btnCloseAppliancesSuggestion.addEventListener('click', function(e) { 
    e.stopPropagation(); 
    closeSuggestions(btnCloseAppliancesSuggestion.parentElement.parentElement, suggestionAppliancesDOM);
});
btnCloseUstensilsSuggestion.addEventListener('click', function(e) { 
    e.stopPropagation(); 
    closeSuggestions(btnCloseUstensilsSuggestion.parentElement.parentElement, suggestionUstensilsDOM);
});



