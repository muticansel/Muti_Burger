import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)} TL</strong></p>
        {controls.map(buildCtrl => (
            <BuildControl
                key={buildCtrl.label}
                label={buildCtrl.label}
                disabled={props.disabled[buildCtrl.type]}
                added={() => props.ingredientAdded(buildCtrl.type)}
                removed={() => props.ingredientRemoved(buildCtrl.type)} />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO OREDER'}</button>
    </div>
);

export default buildControls;
