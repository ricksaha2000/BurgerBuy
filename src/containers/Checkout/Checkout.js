import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Button from '../../components/UI/Button/Button';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component{


    checkoutCancelledHandler = () => {

        console.log(this.props)
        this.props.history.goBack();


    }


    checkoutContinuedHAndler = () =>{

        this.props.history.replace('checkout/contact-data');

    }
    render(){
       


      
        return(

            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                onCheckoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHAndler} />
                {/* <Button btnType="Danger" 
                clicked>CANCEL</Button>

                <Button btnType="Success" 
                clicked>CONTINUE</Button> */}

                <Route path={this.props.match.path+'/contact-data'} 
                component={ContactData} />
            </div>
        )
    }


}

const mapStateToProps = state =>{

    return{
        ings : state.ingredients,
        // price: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);