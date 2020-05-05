import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationitems = (props) => (

    <ul className={classes.NavigationItems}>

            <NavigationItem link="/" exact >Burger Builder</NavigationItem>
            {/* <NavigationItem link="/checkout" >Checkout</NavigationItem> */}
            {props.isAuthenticated ?
            <NavigationItem link="/orders" >Orders</NavigationItem>
            :null}
            {props.isAuthenticated ?
            <NavigationItem link="/logout" >LOGOUT</NavigationItem>
                :
            <NavigationItem link="/auth" >SIGN IN</NavigationItem>
            }


    </ul>



);

export default navigationitems;