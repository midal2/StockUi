import axios from 'axios';


//주식정보 reducerData
export function actionStockData(data){
    // console.log(data);
    return {
      type : 'STOCK',
      payload : data
    }
}

//주식정보 reducerData
export function actionSelectStockData(data){
    return {
      type : 'SELECT_STOCK',
      payload : data
    }
}
