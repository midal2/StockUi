

export default function (state=null, action){
  // console.log('r.s');
  switch(action.type){
    case 'SELECT_STOCK':
      console.log('SELECT_STOCK payload');
      console.dir(action.payload);
      return {...action.payload};
    default:
      return state;
  }


}
