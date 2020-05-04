import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Button from '../../components/UI/Button/Button';
import {Route , Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component{

  


    checkoutCancelledHandler = () => {

        console.log(this.props)
        this.props.history.goBack();


    }


    checkoutContinuedHAndler = () =>{

        this.props.history.replace('checkout/contact-data');

    }
    render(){
       

        let summary = <Redirect to="/" />

        if(this.props.ings){
            const rendering = <div><CheckoutSummary 
                ingredients={this.props.ings}
                onCheckoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHAndler} />
                <Route path={this.props.match.path+'/contact-data'} 
                component={ContactData} />
                </div>;

            const purchasedRedirect = this.props.purchased?<Redirect to="/" />:rendering;

            summary = (
                <div>
                {purchasedRedirect}
                </div>
                
                )
        }
      
        return(

            <div>
                

                {summary}

             

               
            </div>
        )
    }


}

const mapStateToProps = state =>{

    return{
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
        // price: state.totalPrice
    }
};



export default connect(mapStateToProps )(Checkout);