import { useState, useEffect } from "react";
import firebase from '../../firebase';

export default function useFirestoreFetch( collection ) {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase.firestore().collection(collection).get().then( snap => {
        const inComing = snap.docs.map( doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setData(inComing)
    })
  }, [collection]);
  
  return data;
}