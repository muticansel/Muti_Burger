import React, { Component } from 'react';

import ingClasses from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={ingClasses.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={ingClasses.BreadTop}>
                        <div className={ingClasses.Seeds1}></div>
                        <div className={ingClasses.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={ingClasses.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={ingClasses.Cheese}></div>;
                break;
            case ('bacon'):
                ingredient = <div className={ingClasses.Bacon}></div>;
                break;
            case ('salad'):
                ingredient = <div className={ingClasses.Salad}></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;