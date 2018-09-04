import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		salad: 0, 
		bacon: 0,
		cheese:0,
		meat: 0
	},
	totalPrice: 8
};

const INGREDIENT_PRICES = {
	salad: 1,
	cheese: 2,
	meat: 4,
	bacon: 2.5
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENTS:
		return {
			...state,
			ingredients: {
				...state.ingredients,
				[action.ingredientName]: state.ingredients[action.ingredientName] - 1
			},
			totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
		};
		default:
			return state;
	}
};

export default reducer;