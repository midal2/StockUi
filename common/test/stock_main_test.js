import * as NumberUtil from '../../common/util/number_util';
import * as DateUtil from '../../common/util/date_util';

export let stock = {
    //테스트주식 데이터 생성 @param {number(2)} dataCnt 
    createDummyData:(dataCnt=1) => {
        let itemCnt = NumberUtil.getRandomNumber(dataCnt);
        let resultObjArr = [];
        for (var i=0; i<itemCnt; i++){
            let obj = {};
        
            obj = {
            stockTime : DateUtil.getNowDate() ,
            stockName : "임시생성" + i ,
            stockCd   : "99999" + NumberUtil.getRandomNumber(9),
            stockNowValue : NumberUtil.getRandomNumber(20000),
            stockIncDecValue : NumberUtil.getRandomNumber(1000, -1000),
            stockIncDecSign : "▼",
            stockIncDecRate : NumberUtil.getRandomNumber(30),
            stockStatusList : [],
            };
        
            // 데이터상태생성
            let statusCnt = NumberUtil.getRandomNumber(5);
            for (var x=0; x<statusCnt; x++){
            let createdStatus = NumberUtil.getRandomNumber(3);   
            let createStatus = (summary, value) => {return {summary, value}};
        
            switch(createdStatus){
                case 1:
                obj.stockStatusList.push(createStatus('10%증가', '현재 10% 증가중'));
                break;
        
                case 2:
                obj.stockStatusList.push(createStatus('20%증가', '방금 20% 증가중'));
                break;
                
                case 3:
                obj.stockStatusList.push(createStatus('30%증가', '급격히 30% 증가중'));
                break;
                
                case 4:
                obj.stockStatusList.push(createStatus('40%증가', '현저히 40% 증가상태'));
                break;
                
                case 5:
                obj.stockStatusList.push(createStatus('50%증가', '여전히 50% 증가상태'));
                break;
        
                default:
                console.log('createdStatus default[' + createdStatus + ']' );
                obj.stockStatusList.push(createStatus('0%증가', '변동이없음 '));
                break;
            }
            }
            
            resultObjArr.push(obj);
        }
        
        return resultObjArr;
    },

    //테스트주식 차트데이터 생성 
    createChartData:()=>{
        return [
                    {
                    "id": "japan",
                    "color": "hsl(128, 70%, 50%)",
                    "data": [
                                {
                                "x": "plane",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "helicopter",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "boat",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "boat1",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "plane1",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "helicopter2",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "boat3",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "boat12",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "boat31",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                                {
                                "x": "boat123",
                                "y": NumberUtil.getRandomNumber(100)
                                },
                            ]
                    }
                ]
    }
}