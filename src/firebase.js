import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD2Mq1rhbzqHwf_YuLKMX1-wcLr2z2SLmQ',
  authDomain: 'facebook-clone-e04b0.firebaseapp.com',
  projectId: 'facebook-clone-e04b0',
  storageBucket: 'facebook-clone-e04b0.appspot.com',
  messagingSenderId: '150285159594',
  appId: '1:150285159594:web:e14774e11ec64b98b814d3',
  measurementId: 'G-XG1E35LSFQ',
});
const db = firebaseApp.firestore();

export default db;
