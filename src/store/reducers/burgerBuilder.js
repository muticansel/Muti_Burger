import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 7.5,
	error: false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 1,
	cheese: 2,
	meat: 4,
	bacon: 2.5
}

const addIngredient = (state, action) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	}
	return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
	const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
	const updatedIngs = updateObject(state.ingredients, updatedIng);
	const updatedSt = {
		ingredients: updatedIngs,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
		building: true
	}
	return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 7.5,
		error: false,
		building: false
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENTS:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true }) // There is no need to build a seperate function for that action
		default:
			return state;
	}
};

export default reducer;