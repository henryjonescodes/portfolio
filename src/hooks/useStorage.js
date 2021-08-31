import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //Storage Reference
        const storageRef = ref(projectStorage,file.name);
        console.log("StorageRef",storageRef);

        //Database Reference
        const collectionRef = collection(projectFireStore, 'images');
        console.log("CollectionRef", collectionRef);

        //upload file to reference and attatch listener
        const uploadTask = uploadBytesResumable(storageRef,file);
        console.log(uploadTask);

        //Do upload
        uploadTask.on('state_changed', (snap) => {
            //Calculate and set current upload percentage
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            //Trigger error
            setError(err);
        }, async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                
                //Get timestamp
                const newDate = new Date();
                const createdAt = Timestamp.fromDate(newDate);
                console.log("Time",createdAt);
                
                //Add to database (firestore) and set url
                addDoc(collectionRef,{
                  downloadURL,
                  createdAt 
                })
                setUrl(downloadURL);
            });
        })
    }, [file]);

    return {progress, url, error};
}

export default useStorage;