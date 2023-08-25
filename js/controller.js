
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js'
import recipeViews from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';


//console.log(icons);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot){
  module.hot.accept();
}

const controlRecipies = async function(){
  try{
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
    recipeViews.renderSpinner();
    //Loading Recipe

    await model.loadRecipe(id);

  // Rendering a recipe.

    recipeViews.render(model.state.recipe);
   //TEST
   controlServings();
   
  }catch (err){
     recipeViews.renderError();
    
  }
  
};

const controlSearchResults = async function(){
  try {

    resultsView.renderSpinner();

    //1. Get search Query 
    const query = searchView.getQuery();
    if(!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    //3. Rendering results

      // console.log(model.state.search.results)
      //resultsView.render(model.state.search.results)
      //for all results in one page we used the above one.

   resultsView.render(model.getSearchResultsPage());

   //4. Render initial pagination buttons
    paginationView.render(model.state.search);
 

  } catch (err) {
    console.log(err);
    recipeViews.renderError();
  }
 
};

const controlPagination = function(gotoPage){
  //1 Render New Results 
  resultsView.render(model.getSearchResultsPage(gotoPage));

   //4. Render New pagination buttons
    paginationView.render(model.state.search);

}

const controlServings = function(newServings=4){
  //Update the recipe servings(in state)
  model.updateServings(newServings);

  //Update the recipe view
  //recipeViews.render(model.state.recipe);
  recipeViews.update(model.state.recipe); 
}

const init = function(){
  recipeViews.addHandlerRender(controlRecipies);
  recipeViews.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

};
init();