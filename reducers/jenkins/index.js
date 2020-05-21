/**
 * ------------------------------------------------------------------------
 * NAME : reducers/main/index.js
 * DESC : 게시글 관련 리듀서
 * ------------------------------------------------------------------------
 * INFO : 
 * REF  : 
 * ------------------------------------------------------------------------
 */

// main 전체 제목, 각각의 main 내용들 에러 났을 때 담을 state들을 만들어줍니다.
export const initialState = {
    mainTitle     : '',
    mainContents  : { init : true },
    loadMainError : '',
}

// 비동기 적인 작업을 해야하므로 요청, 성공, 실패로 액션 타입들을 만들어 줘요.
export const LOAD_MAIN_REQUEST = 'LOAD_MAIN_REQUEST';
export const LOAD_MAIN_SUCCESS = 'LOAD_MAIN_SUCCESS';
export const LOAD_MAIN_FAILURE = 'LOAD_MAIN_FAILURE';

// 액션 생성 함수입니다. data 부분이 동적으로 바뀔 수 있게 설정 해주었습니다.
export const loadMainRequestAction = (data) => ({
    type : LOAD_MAIN_REQUEST,
    data,
});

export const loadMainSuccessAction = (data) => ({
    type : LOAD_MAIN_SUCCESS,
    data,
});

export const loadMainFailureAction = (error) => ({
    type : LOAD_MAIN_FAILURE,
    error
});

// ...은 spread 문법으로 불변성을 지키기 위해 사용 됩니다.
// 성공시에는 받아온 배열 데이터에서 필요한 부분만 새로운 배열로 만들어서 mainContents에 넣어주었습니다.
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_MAIN_REQUEST:
            return {...state, mainTitle     : action.data};
        case LOAD_MAIN_SUCCESS:
            console.log('action.data :: ', action.data);
            return {...state, mainContents  : action.data};
        case LOAD_MAIN_FAILURE:
            return {...state, loadMainError : action.error};
        default:
            return state;
    }
};

export default reducer;