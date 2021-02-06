import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDz27u3-TUhoPbz-E6Ib3QoMGXsc7pDOf4",
  authDomain: "project-planner-3b762.firebaseapp.com",
  projectId: "project-planner-3b762",
  storageBucket: "project-planner-3b762.appspot.com",
  messagingSenderId: "935839728023",
  appId: "1:935839728023:web:9464e94112d85ddf9804d2"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectFirestore = firebase.firestore()

export { projectFirestore }

