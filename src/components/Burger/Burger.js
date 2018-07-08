import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
                return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if(transformedIngredient.length === 0){
        transformedIngredient = <p>Please start adding ingredients</p>
    }
    

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;