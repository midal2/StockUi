/* NODE Modules */
import React from 'react';
import Link from 'next/link';

/* CSS Modules */

/* CUSTOM Components */

/**
 * index.js
 *
 * 프로젝트 진입 페이지
 */ 
const index = () => {
    return (
        <div>
            <h1 className='example'>Hello!!! DMZR!</h1>
            <Link href="/stock_main">
                <a>STOCK_MAIN</a>
            </Link>
        </div>
    );
};

export default index;

