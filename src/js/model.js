import { API_URL } from "./config";
import {getJSON} from './helpers';
export const state ={
    recipe: {},
    search:{
        query: '',
        results: [],
    },
};

export const loadRecipe = async function(id){
    try{
        const data = await getJSON(`${API_URL}${id}`);
        const {recipe} = data.data;
        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients,
        };
        console.log(state.recipe);
        console.log(data);
}catch(err){
    console.error(`${err} u got error`);
    throw err;
}
}
export const loadSearchResults = async function(query){
    try{
        state.search.query = query
        const data = await getJSON(`${API_URL}?search=${query}`)

        console.log(data)

        state.search.results = data.data.recipes.map(rec =>{
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                // ...(rec.key && {key: rec.key}),
            };
        });
    }catch(err){
        throw err;
    }
}
//loadSearchResults('pizza');