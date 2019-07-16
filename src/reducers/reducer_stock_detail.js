const nowTime = ()=>{
    var time = new Date();
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

let nowData = [
  {
    title: '', //주식명
    nowPrice: '', //현재가
    time: nowTime(), //현재시간
    differAmt: '', //등락폭
  },
];

export default function (state=null, action){

  switch(action.type){
    case 'STOCK':
      nowData = [...action.payload];
      return nowData;
    default:
      return nowData;
      break;
  }


}
