
import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredients'
const burger = (props) =>{
        let transformedIngredients = Object.keys(props.ingredients)
                .map(igKey=>{
                        // console.log(igKey);
                    return [...Array(props.ingredients[igKey])].map((_ , i)=>{

                                return <BurgerIngredient key={igKey+i} type={igKey} /> 


                    })
                    //

                })
                


                .reduce((arr,el)=>{

                    // console.log(arr);
                    // console.log(el);
                    // console.log(arr.concat(el));
                    return arr.concat(el);

                },[]);
                // console.log(transformedIngredients)

        if(transformedIngredients.length === 0){
        transformedIngredients = <p>PLEASE START ADDING INGREDIENTS</p>;
            }
        return(
                <div className={classes.Burger}>


                    <BurgerIngredient type="bread-top" />
                    
                    {transformedIngredients}

                    <BurgerIngredient type="bread-bottom" />


                </div>


                )

};

export default burger;