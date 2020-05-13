/* NODE Modules */
import React from 'react';
import Link from 'next/link';

/* CSS Modules */

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';

/* CUSTOM Components */
import Layout from './site_main/layout';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection : 'column',
        minHeight: '98vh',
    },
    body: {
        flex: 1,
    },
    footer: {
        height:'100',
        marginTop: 'auto',
        background: '#333'
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
        <div>
            <Layout>
                <h1 className='example'>Hello!!! DMZR!</h1>
                <Link href="/stock_main">
                    <a>STOCK_MAIN</a>
                </Link>
            </Layout>
        </div>
    );
};

export default index;

