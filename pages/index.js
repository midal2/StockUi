/* NODE Modules */
import React from 'react';
import Link from 'next/link';

/* material Modules */
import { Typography } from '@material-ui/core';

/* material Styles */
import { makeStyles } from '@material-ui/core/styles';

/* CUSTOM Modules */
import Layout from '../pages/site_main/layout';

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
}));

/**
 * index.js
 *
 * 프로젝트 진입 페이지
 */ 
const index = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Layout>
                <h1 className='example'>Hello!!! DMZR!</h1>
                <Link href="/stock_main">
                    <a>STOCK_MAIN</a>
                </Link>
                <Typography paragraph>
                    App Bar 적용방법 : 참고 파일 - pages/index.js
                </Typography>
                <Typography paragraph>
                    Layout 태그 안에 페이지 내용 추가 후 사용
                </Typography>
            </Layout>
        </div>
    );
};

export default index;

