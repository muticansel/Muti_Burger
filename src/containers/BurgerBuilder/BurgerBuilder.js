import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 4,
    bacon: 2.5
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);

    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 8,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0)
            return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Cansel Muti',
                address: {
                    street: '66',
                    zipCode: '06390',
                    country: 'Turkey'
                },
                email: 'cancel>test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary
            price={this.state.totalPrice.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} />
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchaseable={this.state.purchaseable}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);