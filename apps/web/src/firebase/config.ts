import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyByez9FXJYg-6MCyer-ILIgpXUV6oTnrqo',
  authDomain: 'zchemacraft-dd2f7.firebaseapp.com',
  projectId: 'zchemacraft-dd2f7',
  storageBucket: 'zchemacraft-dd2f7.firebasestorage.app',
  messagingSenderId: '654752619455',
  appId: '1:654752619455:web:04aa6689cecafc6567df0a',
  measurementId: 'G-QERT5EKPR7',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
