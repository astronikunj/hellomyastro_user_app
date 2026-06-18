import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

	apiKey: 'AIzaSyAGwv_GXWcbEU-jxur4RFAqerd1N_DUWpQ',

	authDomain: 'hello-myastro.firebaseapp.com',

	databaseURL: 'https://hello-myastro-default-rtdb.firebaseio.com',

	projectId: 'hello-myastro',

	storageBucket: 'hello-myastro.firebasestorage.app',

	messagingSenderId: '887653457697',

	appId: '1:887653457697:web:c30f1ee45ac817ae516860',

	measurementId: 'G-LZK7Q2GW2T',

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
