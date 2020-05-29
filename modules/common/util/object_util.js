/**
 * 객체가 비었는지 확인
 * @param {object} obj 
 */
export function isEmpty(obj){
    if ((obj == null) || (obj == undefined)){
        return true;
    }else{
        return false;
    }
}