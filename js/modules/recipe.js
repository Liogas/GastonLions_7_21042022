import { recipeFactory } from "../modules/factories/recipe.js";
import { filterWithTags } from './tag.js';
import { getValueForAdvancedSearch } from "./suggestion.js";

/**
 * Test if ingredient includes value
 * @param {Array} recipe 
 * @param {String} value 
 * @returns
 */
export function testIngredient(recipe, value) {
    return recipe.ingredients.find(ingredient => ingredient.ingredient.includes(value));
}

/**
 * Filter recipes with tags and load suggestions for advanced search
 * @param {String} value 
 * @param {Array} recipes 
 * @param {Array} tabRecipes 
 * @param {Array} tags 
 * @param {Array} suggestions 
 * @returns {Array} tabRecipes, suggestions
 */
export function filterRecipes(value, recipes, tabRecipes, tags, suggestions) {
    tabRecipes = [... recipes];
    if(value.length >= 3) {
        tabRecipes = tabRecipes.filter(function(recipe) {
            if(recipe.name.includes(value)) {
                return true;
            } 
            if(recipe.description.includes(value)) {
                return true;
            }
            return !!testIngredient(recipe, value);
        });
    }
    if(tags.ingredient.length + tags.appliance.length + tags.ustensil.length > 0) {
        tabRecipes = filterWithTags(tabRecipes, tags);
    }
    suggestions = getValueForAdvancedSearch(tabRecipes);
    return {tabRecipes, suggestions};
}

/**
 * Display recipes on contentDOM
 * @param {HTMLElement} contentDOM 
 * @param {Array} tabRecipes 
 */
export function displayCardRecipe(contentDOM, tabRecipes) {
    contentDOM.innerHTML    = '';
    const  { getCardRecipe } = recipeFactory();
    tabRecipes.forEach((recipe) => {
        contentDOM.appendChild(getCardRecipe(recipe));
    });
}