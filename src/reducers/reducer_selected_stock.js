

export default function (state=null, action){
  // console.log('r.s');
  switch(action.type){
    case 'SELECT_STOCK':
      return {...action.payload};
    default:
      return state;
  }


}
