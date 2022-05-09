 export function recipeFactory (){

    function getCardRecipe(dataCard) {
        const { name, time, ingredients, description} = dataCard;

        const article = document.createElement( 'article' );
        article.className = 'recipe';

        const divImg = document.createElement( 'div' );
        divImg.className = 'recipe_image';

        const divUp = document.createElement( 'div' );
        divUp.className = 'recipe_content_up';
        
        const pName = document.createElement( 'p' );
        pName.innerText = name;

        const divTimer = document.createElement( 'div' );
        divTimer.className = 'recipe_timer';

        const img = document.createElement( 'img' );
        img.src = './img/timer.png';
        img.alt = 'timer';

        const pTimer = document.createElement( 'p' );
        pTimer.className = 'timer';
        pTimer.innerText = `${time} min`;
        
        const divDown = document.createElement( 'div' );
        divDown.className = 'recipe_content_down';

        const ulIngredient = document.createElement( 'ul' );
        ulIngredient.className = 'recipe_ingredients';
        ingredients.forEach(function(ingredient) {
            const liIngredient = document.createElement( 'li' );
            liIngredient.className = 'ingredient';
            if(ingredient.quantity) {
                liIngredient.innerHTML = `<b>${ingredient.ingredient}</b> : ${ingredient.quantity}`;
            } else {
                liIngredient.innerHTML = `<b>${ingredient.ingredient}</b>`;
            }
            ulIngredient.appendChild(liIngredient);
        });

        const pDescription = document.createElement( 'p' );
        pDescription.className = 'recipe_description';
        pDescription.innerText = description;

        
        divTimer.appendChild(img);
        divTimer.appendChild(pTimer);

        divUp.appendChild(pName);
        divUp.appendChild(divTimer);

        divDown.appendChild(ulIngredient);
        divDown.appendChild(pDescription);

        article.appendChild(divImg);
        article.appendChild(divUp);
        article.appendChild(divDown);

        return article;
    }

    
    return { getCardRecipe };
}