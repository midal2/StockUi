export default function (state=null, action){
  switch(action.type){
    case 'PROGRAM_SELECTED':
      return action.payload;
  }

  return [
    {
      img: 'http://mail.hsc.ac.kr/help/ko/img/schedule/schedule_main00.jpg',
      title: '주식목록가져오기',
      author: '한국증권거래소',
    },
    {
      img: 'http://image.sportsseoul.com/2017/12/07/news/20171207013514_2.jpg',
      title: '개발관리',
      author: '내꼬',
    },
  ];
}
