import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC1eJqWVLOZKS8iZ8p6o3c8cObXx2NJUQQ',
  authDomain: 'ecommerce-4d87f.firebaseapp.com',
  projectId: 'ecommerce-4d87f',
  storageBucket: 'ecommerce-4d87f.appspot.com',
  messagingSenderId: '543278158531',
  appId: '1:543278158531:web:d2fd53993088a9850cc876',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };
