
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js'
import recipeViews from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';


//console.log(icons);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipies = async function(){
  try{
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
    resultsView.renderSpinner();
    //Loading Recipe

    await model.loadRecipe(id);

  // Rendering a recipe.

    recipeViews.render(model.state.recipe);
   
   
  }catch (err){
     view.renderError();
    
  }
};

const controlSearchResults = async function(){
  try {

    resultsView.renderSpinner();

    //Get search Query 
    const query = searchView.getQuery();
    if(!query) return;
    //Load search results
    await model.loadSearchResults(query);

    //Rendering results
    console.log(model.state.search.results)
    resultsView.render(model.state.search.results)
   
  } catch (err) {
    console.log(err);
    view.renderError();
  }
};

const init = function(){
  recipeViews.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResults);
};
init();