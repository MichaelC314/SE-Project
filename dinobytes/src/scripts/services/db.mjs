import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 


let db = false;

export const getDb = () => {

    if (!db){
    console.log("Initializing Firebase...");
        const firebaseConfig = {

            apiKey: "AIzaSyDBooqyYdSeU3os9fJadodTTrOXLcmAbno",
          
            authDomain: "dinobytes-23de8.firebaseapp.com",
          
            projectId: "dinobytes-23de8",
          
            storageBucket: "dinobytes-23de8.appspot.com",
          
            messagingSenderId: "636670319475",
          
            appId: "1:636670319475:web:a92401dff5f75fb5184306",
          
            measurementId: "G-M1KEEGXK1L"
          
          };

          
          try {
            const app = initializeApp(firebaseConfig);
            getAnalytics(app); // Initialize analytics if needed
            db = getFirestore(app);
            console.log("Firebase initialized successfully.");
        } catch (error) {
            console.error("Error initializing Firebase: ", error); // Log initialization errors
        }
    }

        return db;
    }

   

