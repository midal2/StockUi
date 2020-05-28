/**
 * ------------------------------------------------------------------------
 * NAME : android_native.js
 * DESC : Android App(Native)에서 WebView를 호출하기 위한 함수목록으로 loadUrl(javascript:fn(jsonString))의 형태로 호출해서 사용
 * ------------------------------------------------------------------------
 * INFO : LocalStorage 저장시 'webview.getSettings().setDomStorageEnabled(true);' 추가
 *        Javascript 호출시 'webview.getSettings().setJavaScriptEnabled(true);' 추가
 * REF  :
 * ------------------------------------------------------------------------
 */


/**
 * Json 포맷으로된 문자열만 전달하고 해당내역은 key : value의 형식으로 Storage에 저장처리
 * 저장하는 key는 추가시 여기에 용도 및 상세내용을 기술하도록 한다 
 * @param {String} jsonStr 
 */
function saveLocalStorage(jsonStr){
    const myStorage = window.localStorage;
    
    const jsonObj = JSON.parse(jsonStr);
    for(var prop in jsonObj){
        myStorage.setItem(prop, jsonObj[prop]);
    }

    //console.dir(myStorage);  
}