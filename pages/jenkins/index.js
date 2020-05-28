/* NODE Modules */
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

/* CUSTOM Modules */
import BorderDrawer     from '../../components/border';
import JenkinsTable     from './jenkins_table';
import JenkinsTableRow  from './jenkins_table_row';
import JenkinsBuildCard from './jenkins_builds_card';
import { loadMainRequestAction } from '../../reducers/jenkins'; // posts 리듀서에서 만든 액션

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        flex: 'none',
        maxHeight: '88vh',
        overflow : 'auto',
    },
    div_root: {
        // flex: 'none',
        // overflow : 'auto',
        // maxWidth: '100%',
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
    
    return (
        <BorderDrawer className={classes.root}>
            { mainContents && (
                <div className={classes.div_root}> 
                    {mainContents.map((content, i) => (
                        <div>
                            <JenkinsBuildCard key={i} buildInfo={content} />
                            <br />
                        </div>
                    ))}
                </div>
            )}
        </BorderDrawer>
    )
}

Index.getInitialProps = async ( context ) => {
    // jenkins 리듀서에서 만든 액션을 실행한다.
    context.store.dispatch( loadMainRequestAction() );
    const { mainTitle, mainContents } = context.store.getState();
    return { mainTitle, mainContents };
};

export default Index;