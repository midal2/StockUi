let nowData = [
    {
      title: '', //주식명
      nowPrice: '', //현재가
      time: 't', //현재시간
      differAmt: '', //등락폭
    },
  ];
  
export default function (state = nowData , action) {
    switch(action.type) {
        default:
            return {...nowData}
            
            ;
    }
}