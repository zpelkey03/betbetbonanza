// config/firebaseConfig.js

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAjtblM4O1zdNcWibaSuqg69Y4rokR6rAo",
    authDomain: "betbetbonanza.firebaseapp.com",
    projectId: "betbetbonanza",
    storageBucket: "betbetbonanza.appspot.com",
    messagingSenderId: "175118442458",
    appId: "1:175118442458:web:06db2b9eaae3de0c91aae3",
    measurementId: "G-SL13ZGYN3X"
  };
  
  const app = initializeApp(firebaseConfig);

  export default app;
  