import axios from 'axios';


//주식정보 reducerData
export function actionStockData(data){
    return {
      type : 'STOCK',
      payload : data
    }
}
