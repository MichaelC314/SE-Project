import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 


let db = false;

export const getDb = () => {

    if (!db){

        const firebaseConfig = {

            apiKey: "AIzaSyDBooqyYdSeU3os9fJadodTTrOXLcmAbno",
          
            authDomain: "dinobytes-23de8.firebaseapp.com",
          
            projectId: "dinobytes-23de8",
          
            storageBucket: "dinobytes-23de8.appspot.com",
          
            messagingSenderId: "636670319475",
          
            appId: "1:636670319475:web:a92401dff5f75fb5184306",
          
            measurementId: "G-M1KEEGXK1L"
          
          };

          
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const analytics = getAnalytics(app);

        db = getFirestore(app)

    }

    return db;

}
