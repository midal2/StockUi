export default function selectProgram(tile){
  return{
    type : 'PROGRAM_SELECTED',
    payload : tile,
  }
}

export function test2(){
  console.log('test2');
  setTimeout(()=>{console.log('timer');} , 5000);
  // axios.get('https://finance.naver.com/item/sise_day.nhn?code=215600', {
  //   timeout:'10000',
  //   params:{
  //   },
  //   headers:{
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  //   }
  // })
  //   .then(response => {
  //     console.dir(response)
  //   }).catch(function(error) {
  //       console.log("error" + error);
  //   });

  return{
    type : 'STOCK',
    payload : 'test',
  }
}
