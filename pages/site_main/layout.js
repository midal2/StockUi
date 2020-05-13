/* CUSTOM Components */
import Header from './header'; // 헤더메뉴

const Layout = ( props ) => (
    <div>
        <Header />
        {props.children}
    </div>
);

export default Layout;