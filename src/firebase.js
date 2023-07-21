import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOAoLSqLIMVjY2vxO3lQkNx86T2nLt3e0",
    authDomain: "cocmarketplace-6de0e.firebaseapp.com",
    projectId: "cocmarketplace-6de0e",
    storageBucket: "cocmarketplace-6de0e.appspot.com",
    messagingSenderId: "38917010991",
    appId: "1:38917010991:web:05623dc44fa7f4d24278da",
    measurementId: "G-DPYWJ7M79H"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
        console.log(user.uid)
        return user.uid
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const fetchUsers = async () => {
    try {
      const usersCollection = db.firestore().collection('users');
      const snapshot = await usersCollection.get();
      const fetchedUsers = snapshot.docs.map((doc) => doc.data());
      return fetchedUsers;
    } catch (error) {
      console.log('Error fetching users:', error);
    }
};

// Fetch all the available collections
const fetchCollections = async () => {
    try {

      const collections = await db.listCollections();
      const collectionIds = collections.map((collection) => collection.id);
      console.log('Available collections:', collectionIds);

      return collectionIds;

    } catch (error) {
      console.log('Error fetching collections:', error);
    }
};


const logInWithEmailAndPassword = async (email, password) => {
    try {
        const res =await signInWithEmailAndPassword(auth, email, password);
        const user = res.user
        console.log(user.uid)
        return user.uid
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        console.log(user.uid)
        return user.uid
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
    return true
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};