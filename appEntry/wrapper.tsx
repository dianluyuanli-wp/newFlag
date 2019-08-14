import * as React from 'react';
import { FC } from 'react';
import { Provider, observer } from 'mobx-react';
import Entry from '../page/home/index';
// import Login from '../component/login';
// import Register from '../component/register';
import { BrowserRouter as Router, Route } from "react-router-dom";
import flagStore from './flagStore';

// import Loading from '@UI/loading';
// import Loadable from 'react-loadable';  //  这个支持后端渲染

// const LoginCom = lazy(() => import(/* webpackChunkName: 'login' */ '../component/login'));

// const Login = () => (
//     <Suspense fallback={Loading()}>
//         <LoginCom />
//     </Suspense>
// )
// const Register = Loadable({
//     loader: () => import(/* webpackChunkName: 'register' */'../component/register'),
//     loading: Loading
// })

// @observer
// class dataWrapper extends React.Component {
//     render() {
//         const Store = new flagStore(this.props.userInfo);
//         return (
//             <Provider chatStore={Store}>
//                 <Router>
//                     {/* <Route path='/login.html' component={Login} />
//                     <Route path='/register.html' component={Register} /> */}
//                     <Route path='/home.html' component={Entry} />
//                 </Router>
//             </Provider>
//         )
//     }
// }

interface MyComponentProps {
    className?: string;
    style?: React.CSSProperties;
    userInfo?: any
  }
  
  

const dataWrapper: FC<MyComponentProps> = props => {
    console.log(props, 'dddd');
    const Store = new flagStore({});
    return (
        <Provider flagStore={Store}>
            <Router>
                {/* <Route path='/login.html' component={Login} />
                <Route path='/register.html' component={Register} /> */}
                <Route path='/home.html' component={Entry} />
            </Router>
        </Provider>
    )
};

// export default TsxComp;

export default dataWrapper;