import { collection, query, onSnapshot, orderBy} from 'firebase/firestore';

import { useState, useEffect } from 'react';
import { projectFireStore } from '../firebase/config';

const useFirestore = (col) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const q = query(collection(projectFireStore, col), orderBy('createdAt','desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        });
        return () => unsubscribe();
    }, [col])
    return { docs };
}

export default useFirestore;