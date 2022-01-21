import { getAuth } from 'firebase/auth' ;
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../lib/firebaseCredentials';


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Logout = (props) => {

    const onFinish = () => {
        auth.signOut().then(() => {
            window.location.href = "./";
        
        });
    };
    
    onFinish();
};

export default Logout;