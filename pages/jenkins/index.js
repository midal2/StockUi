/* NODE Modules */
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';

/* CUSTOM Modules */
import BorderDrawer from '../../components/border';
import { loadMainRequestAction } from '../../reducers/jenkins'; // posts 리듀서에서 만든 액션

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection : 'column',
        minHeight: '98vh',
    },
}));

/**
 * -----------------------------------
 * jenkins index.js - Index
 * -----------------------------------
 * 
 * -----------------------------------
*/
const Index = () => {
    const classes = useStyles();
    const dispatch = useDispatch(); // dispatch를 사용하기 쉽게 하는 hook
    const { mainTitle, mainContents } = useSelector(state => state.jenkinsMain); // jenkins redux의 state들을 불러온다.

    const onClickHero = useCallback((hero) => () => {
        dispatch(loadMainRequestAction(hero));
    }, []); // hero 넣어서 동적으로 data를 변경해주는 action 생성함수를 시행한다.
    
    return (
        
        <BorderDrawer>
            <h1 className='example'>JENKINS MAIN</h1>
            <input type="button" onClick={onClickHero('batman')} defaultValue='클릭' />
            <h1>TITLE : {mainTitle}</h1>
            {/* <div> mainContents :: {JSON.stringify(mainContents)} </div> */}
            { mainContents && (
                <div> mainContents :: {JSON.stringify(mainContents)} </div>
            )}
        </BorderDrawer>
    )
}

Index.getInitialProps = async ( context ) => {
    // jenkins 리듀서에서 만든 액션을 실행한다.
    context.store.dispatch( loadMainRequestAction('batman') );
    const { mainTitle, mainContents } = context.store.getState();
    console.log(' :: mainTitle :: ', mainTitle, ' :: mainContents :: ', mainContents);
    return { mainTitle, mainContents };
};

export default Index;