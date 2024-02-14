// config/firebaseConfig.js

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "",
    authDomain: "betbetbonanza.firebaseapp.com",
    projectId: "betbetbonanza",
    storageBucket: "betbetbonanza.appspot.com",
    messagingSenderId: "175118442458",
    appId: "1:175118442458:web:06db2b9eaae3de0c91aae3",
    measurementId: "G-SL13ZGYN3X"
  };
  
  const app = initializeApp(firebaseConfig);

  export default app;
  