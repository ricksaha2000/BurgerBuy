import React , {Component} from 'react';
import {connect} from 'react-redux';
import Aux from'../../hoc/Auxil/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
class BurgerBuilder extends Component{


    // constructor(props){

    //     super(props);
    //     this.state = {...}

    // }

    state = {

        // ingredients :null,
        // totalPrice:8,
        purchasable:false,
        purchasing:false,
        // loading:false,
        // error:false,

    }

    componentDidMount(){

        this.props.onInitIngredients();

    }

    updatePurchaseState(ingredients){ //pass in the updated ingredients

        // const ingredients = {

        //     ...this.state.ingredients

        // }; //OLD INGREDIENTS ....ERROR

        const sum = Object.keys(ingredients)
            .map(igKey => {

                return ingredients[igKey];
            })
            
            .reduce((sum , el) => {

                return sum+el;

            } , 0);

        return sum>0;
    }



    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});

        }
        else{

            this.props.history.push("/auth");

        }

    }

    purchaseCancelHandler = () =>{

        this.setState({purchasing:false});


    }
    purchaseContinueHandler = () =>{
    this.props.onInitPurchase();
    this.props.history.push('/checkout');




    }



    render(){

        const disableInfo = {

            ...this.props.ings
        };

        for(let key in disableInfo){

            disableInfo[key] = disableInfo[key]<=0
        }

        let orderSummary = null;
        
        
        
        

        let burger = <Spinner />;
        if(this.props.ings){
        burger = (<Aux>
            <Burger ingredients = {this.props.ings} />
            <BuildControls 
            ingredientAdded={this.props.onIngredientAdded} 
            ingredientSubtracted = {this.props.onIngredientRemoved}
            disabled = {disableInfo}
            purchasable = {this.updatePurchaseState(this.props.ings)}
            ordered = {this.purchaseHandler}
            price={this.props.price}
            isAuth = {this.props.isAuthenticated}
            />
        </Aux> );


        orderSummary = <OrderSummary ingredients={this.props.ings}
        price={this.props.price} 
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}/> ;
        }

        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }


        return(

    <Aux>
        <Modal show={this.state.purchasing} 
        modalClosed={this.purchaseCancelHandler}> 
 

        {orderSummary}
        </Modal>

        {burger}

    </Aux>

        );
    }


}

const mapStateToProps = state =>{

    return {

        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !==null,


    };
}

const mapDispatchToProps = dispatch =>{

    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:() =>dispatch(burgerBuilderActions.purchaseInit())

    };

}



export default connect(mapStateToProps ,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));
