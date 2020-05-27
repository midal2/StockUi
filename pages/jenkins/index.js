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

    const onClickSearch = useCallback(() => () => {
        dispatch(loadMainRequestAction());
    }, []); // hero 넣어서 동적으로 data를 변경해주는 action 생성함수를 시행한다.
    
    return (
        <BorderDrawer className={classes.root}>
            { mainContents && (
                <div className={classes.div_root}> 
                    <Typography paragraph>Jenkins Job Name : {mainContents.displayName}</Typography>
                    <JenkinsBuildCard 
                        title={mainContents.displayName+' Build History'} 
                        subheader={'총 '+mainContents.builds.length+' 건'} 
                        builds={mainContents.builds}/>
                    <br />
                    {/* <Button variant="contained" onClick={onClickSearch()}>조회</Button> */}
                    <Typography paragraph>요약정보</Typography>
                    <JenkinsTable>
                        <JenkinsTableRow name='firstBuild' number={mainContents.firstBuild.number} />
                        <JenkinsTableRow name='lastBuild' number={mainContents.lastBuild.number} />
                        <JenkinsTableRow name='lastCompletedBuild' number={mainContents.completedBuild.number} />
                        <JenkinsTableRow name='lastFailedBuild' number={mainContents.failedBuild.number} />
                        <JenkinsTableRow name='lastStableBuild' number={mainContents.stableBuild.number} />
                        <JenkinsTableRow name='lastSuccessfulBuild' number={mainContents.successfulBuild.number} />
                        <JenkinsTableRow name='lastUnsuccessfulBuild' number={mainContents.unsuccessfulBuild.number} />
                    </JenkinsTable>
                </div>
            )}
        </BorderDrawer>
    )
}

Index.getInitialProps = async ( context ) => {
    // jenkins 리듀서에서 만든 액션을 실행한다.
    context.store.dispatch( loadMainRequestAction() );
    const { mainTitle, mainContents } = context.store.getState();
    console.log(' :: mainTitle :: ', mainTitle, ' :: mainContents :: ', mainContents);
    return { mainTitle, mainContents };
};

export default Index;