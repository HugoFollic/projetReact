import { getAuth } from 'firebase/auth' ;
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../lib/firebaseCredentials';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const user = auth.currentUser;

const Profile = () => {

    if(user){
        return(user.email);
    }
};

export default Profile;
