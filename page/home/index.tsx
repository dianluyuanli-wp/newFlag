import * as React from 'react';
import { Provider, observer, inject } from 'mobx-react';
import HeaderPanel from './HeaderPanel';
//import BodyPanel from './BodyPanel';

// function test() {
//     return (
//         <div>
//             I am he!
//         </div>
//     )
// }

//const TsxComp: React.FunctionComponent = () => <div>TsxComp</div>;

const Home: React.FC = () => {
    return(
        <React.Fragment>
            <HeaderPanel />
            {/* <BodyPanel originData={data.data}/> */}
        </React.Fragment>
    )
}

export default inject('flagStore')(observer(Home));