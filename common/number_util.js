/**
 * 
 * @param {number} max 최대값
 * @param {number} min 최소값(default=1) 
 */
export function getRandomNumber(max, min = 1){
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
}