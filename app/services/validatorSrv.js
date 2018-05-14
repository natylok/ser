const Order = require('../models/order');
const ValidatorSrv = {
    validateOrder: (orderObj,user_id) => {
        let promise = new Promise((resolve,reject) => {
            Order.find({user_id,date:orderObj.date}).then((orders,err) => {
                let validationResults = ValidatorSrv.runOrderValidations(orders,orderObj);
                if(validationResults){
                    reject(validationResults);
                }
                else{
                    resolve(validationResults);
                }
            });
        });
        return promise;
    },
    runOrderValidations:(orders,currentOrder) => {
        let validation = null;
        let validationText = '';
        for(let i = 0; i < orderValidations.length; i++){
            validation = orderValidations[i].invoke(orders,currentOrder);
            if(validation){
                validationText = orderValidations[i].status.message;
                break;
            }
        }
        return validation ? validationText : null;
        
    },
    isSameOrderTime: (firstOrder,secondOrder) => {
        return firstOrder.startHour === secondOrder.startHour && firstOrder.endHour === secondOrder.endHour;
    },
    isOrderAlreayExist: {
        invoke: (orders,currentOrder) => {
            let takenOrder = null;
            orders.forEach((order,index) => {
                if(ValidatorSrv.isSameOrderTime(order,currentOrder)){
                    takenOrder = order;    
                }
            });
            return takenOrder;
        },
        status:{
            message: "Order is already exist"
        }
    }
};
const orderValidations = [ValidatorSrv.isOrderAlreayExist];
module.exports = ValidatorSrv;