import { searchFactory } from "./factories/search.js";
import { testIngredient } from "./recipe.js";
import { filter } from '../app.js';

/**
 * Test tag on recipe
 * @param {Array} recipe 
 * @param {Array} tags 
 * @param {String} type 
 * @returns {boolean}
 */
function testTag(recipe, tags, type) {
    for(let i=0; i<tags.length; i++) {
        if(type === 'ingredient') {
            if(!!testIngredient(recipe, tags[i])) {
                return true;
            }
        } else if(type === 'appliance') {
            if(recipe.appliance.includes(tags[i])) {
                return true;
            }
        } else if(type === 'ustensil') {
            if(!!recipe.ustensils.find(ustensil => ustensil.includes(tags[i]))){
                return true;
            }
        }
    }
    return false;
}

/**
 * Filter recipes with tags
 * @param {Array} recipes 
 * @param {Array} tags 
 * @returns {Array} recipes
 */
export function filterWithTags(recipes, tags) {
    recipes = recipes.filter(function(recipe) {
        if(tags.ingredient.length > 0) {
            if(!testTag(recipe, tags.ingredient, 'ingredient')) {
                return false; 
            }
        }
        if(tags.appliance.length > 0) {
            if(!testTag(recipe, tags.appliance, 'appliance')) {
                return false;
            }
        }
        if(tags.ustensil.length > 0) {
            if(!testTag(recipe, tags.ustensil, 'ustensil')) {
                return false;
            }
        }
        return true;
    });
    return recipes;
}

/**
 * Remove the tag HTMLElement and on array with all tags
 * @param {HTMLElement} tagDOM 
 * @param {String} value 
 * @param {Array} tags 
 * @param {HTMLElement} contentDOM 
 */
export function removeTag(tagDOM, value, tags, contentDOM) {
    contentDOM.removeChild(tagDOM);
    // Remove tag on array
    tags.splice(tags.indexOf(value), 1);
    filter(document.getElementById('main_search_bar').value);    
}

/**
 * Add tag on contentDOM and on array with all tags
 * @param {String} value 
 * @param {String} type 
 * @param {Array} tags 
 * @param {HTMLElement} contentDOM 
 */
export function addTag(value, type, tags, contentDOM) {
    tags[type].push(value);
    const {getTagDOM} = searchFactory();
    const tag         = getTagDOM(value, type, tags[type], contentDOM);
    contentDOM.appendChild(tag);  
}

