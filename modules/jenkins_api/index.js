/**
 * ------------------------------------------------------------------------
 * NAME : modules/jenkins_api/index.js
 * DESC : AP axios 통신 모듈 
 * ------------------------------------------------------------------------
 * INFO : StockAp API 호출
 * REF  : https://wlsdud2194.github.io/posts/CORS-%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%9D%B4%EC%8A%88/
 * ------------------------------------------------------------------------
 */

// NODE Modules
import axios from 'axios';

// CUSTOM Modules
import Config from '../../config';

const JenKinsAPI = {
    retrieveBuildsInfo: ( ) => {
        return axios({
            method  : 'get',
            url     : Config.JENKINS_SERVICE_URL+`/JenkinsAPI/retrieveBuildsInfo`,
        });
    },
    retrieveBuildDeatilInfo: async ( jobName, buildNumber ) => {
        console.log( 'jobName : ',jobName,', buildNumber : ', buildNumber );
        if ( !jobName || !buildNumber ) {
            return ;
        }

        return axios({
            method  : 'get',
            url     : Config.JENKINS_SERVICE_URL+`/JenkinsAPI/retrieveBuildDeatilInfo/`+jobName+`/`+buildNumber,
        });
    },
};

export default JenKinsAPI;