import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import {Redirect} from 'react-router-dom';

class Auth extends Component{
    state = {
        controls:{

            email:{
                elementType:'input',
                elementConfig:{

                    type:'email',
                    placeholder:'User E=mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true,
                },
                valid:false,
                touched:false,



            },
            password:{
                elementType:'input',
                elementConfig:{

                    type:'password',
                    placeholder:'User Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                },
                valid:false,
                touched:false,



            },
        },
        isSignup:false,
    }


    checkValidity(value , rules){

        let isValid = true;

        if(rules.required){
            isValid = value.trim() !=='' && isValid;

        }

        if(rules.minLength){
            isValid = value.length >=rules.minLength && isValid;
        }


        if(rules.maxLength){
            isValid = value.length <=rules.maxLength && isValid;
        }

        return isValid;
    }


    inputChangedHandler = (event , controlname)=>{

        const updatedControls = {
            ...this.state.controls,
             [controlname]:{

                ...this.state.controls[controlname],
                value:event.target.value,
                valid:this.checkValidity(event.target.value , this.state.controls[controlname].validation),
                touched:true,
            
            }
        }

        this.setState({controls:updatedControls});
    }


    submitHandler = (event) =>{

        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value , this.state.controls.password.value,this.state.isSignup);
        
    }

    switchAuthModeHandler = () =>{

        this.setState(prevState =>{

            return{
                isSignup:!prevState.isSignup
            };
        });
    }
    render(){


        const formElementArray = [];
    for(let key in this.state.controls){
        formElementArray.push({
            id:key,
            config:this.state.controls[key]
        });

    }

    let form =formElementArray.map(formElement =>(

        <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event,formElement.id)}
        invalid = {!formElement.config.valid}
        shouldValidate = {formElement.config.validation}
        touched = {formElement.config.touched}

        />



         

    )
        
    );


    if(this.props.loading){

        form = <Spinner />
            
    }

    let authRedirect = null;

    if(this.props.isAuthenticated && !this.props.isbuilding){

        authRedirect =<Redirect to="/" />

    }
    if(this.props.isAuthenticated && this.props.isbuilding)
    {
        authRedirect =<Redirect to="/checkout" />

    }


        return(
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">{this.state.isSignup?'SIGN UP':'SIGN IN'}</Button>

                </form>
                <Button
                
                clicked={this.switchAuthModeHandler}
 
                btnType="Danger">
                    
                    SWITCH TO {this.state.isSignup?'SIGN IN':'SIGN UP'} 
                    
                    
                </Button>

            </div>

        )
    }
}

const mapStateToProps = state =>{

    return {

        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        isbuilding:state.burgerBuilder.building,

        
    }
}



const mapDispatchToProps = dispatch =>{

    return{
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
