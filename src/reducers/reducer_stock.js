const nowTime = ()=>{
    var time = new Date();
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

export default function (state=null, action){
  console.log('action:' + action);

  switch(action.type){
    case 'STOCK':
      return [
        {
          title: '주식333',
          nowPrice: '65000',
          time: nowTime(),
          differAmt: '1000',
        },
        {
          title: '주식2',
          nowPrice: '65000',
          time: '13:45',
          differAmt: '1000',
        },
        {
          title: '주식3',
          nowPrice: '65000',
          time: '13:45',
          differAmt: '1000',
        },
        {
          title: '주식4',
          nowPrice: '65000',
          time: '13:45',
          differAmt: '1000',
        },
      ];
      break;
    default:
      return [
        {
          title: '주식',
          nowPrice: '65000',
          time: '13:45',
          differAmt: '1000',
        },
        {
          title: '주식2',
          nowPrice: '65000',
          time: '13:45',
          differAmt: '1000',
        },
        {
          title: '주식3',
          nowPrice: '65000',
          time: '13:45',
          differAmt: '1000',
        },
        {
          title: '주식4',
          nowPrice: '65000',
          time: '13:45',
          differAmt: '1000',
        },
      ];
      break;
  }


}
