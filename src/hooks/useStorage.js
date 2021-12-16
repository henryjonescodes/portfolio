import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore'

// const useStorage = (col, file, title, desc, location, medium) => {
const useStorage = (col, file, key, title, description) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //Storage Reference
        const storageRef = ref(projectStorage,file.name);

        //Database Reference
        const collectionRef = collection(projectFireStore, col);

        //upload file to reference and attatch listener
        const uploadTask = uploadBytesResumable(storageRef,file);

        //Do upload
        uploadTask.on('state_changed', (snap) => {
            //Calculate and set current upload percentage
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            //Trigger error
            setError(err);
        }, async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((href) => {
                console.log('File available at', href);
                
                //Get timestamp
                const newDate = new Date();
                const createdAt = Timestamp.fromDate(newDate);
                console.log("Time",createdAt);
                
                //Add to database (firestore) and set url
                addDoc(collectionRef,{
                  href,
                  createdAt,
                  key,
                  title,
                  description
                })
                setUrl(href);
            });
        })
    }, [col, file, key, title, description]);

    return {progress, url, error};
}

export default useStorage;