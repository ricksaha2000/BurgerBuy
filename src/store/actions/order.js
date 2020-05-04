import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id , orderData) =>{
    return {

        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData,
    };
}

export const purchaseBurgerFail = (error) =>{

return{
    type:actionTypes.PURCHASE_BURGER_FAIL,
    error:error,
};
}


export const purchaseBurgerStart = (orderData)=> {

    return{
        type:actionTypes.PURCHASE_BURGER_START
    };

};
export const purchaseBurger = (orderData) =>{
    return dispatch =>{
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerStart());
            dispatch(purchaseBurgerSuccess(response.data.name , orderData));
        })
        
        .catch(error => {
            dispatch(purchaseBurgerFail(error));

        });
    };

    };

    export const purchaseInit = () =>{

        return{
            type:actionTypes.PURCHASE_INIT,

        }
    }


export const fetchOrderSuccess = (orders) =>{

    return {
        type:actionTypes.FETCHORDERS_SUCCESS,
        orders:orders,

    };
};

export const fetchOrderFail = (error) =>{

    return {
        type:actionTypes.FETCHORDERS_FAIL,
        error:error,        
    };
};


export const fetchOrderStart = () =>{

    return{

        type:actionTypes.FETCHORDERS_START,

    };
};


export const fetchOrders = () => {
    return dispatch =>{
    dispatch(fetchOrderStart());
    axios.get('/orders.json')
    .then(res =>{
        const fetchOrders =[];
        for(let key in res.data){

            fetchOrders.push({
                ...res.data[key],
                id: key
            });
        }
        dispatch(fetchOrderSuccess(fetchOrders));
        
    })
    .catch(err =>{

        dispatch(fetchOrderFail(err));

    });
    }
}