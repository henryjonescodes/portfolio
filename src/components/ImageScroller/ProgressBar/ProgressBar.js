import React, { useEffect } from 'react';
import useStorage from '../../../hooks/useStorage';
// import { motion } from 'framer-motion';
import { ProgressBarSlider, ProgressContainer } from './ProgressBarElements';

const ProgressBar = ({collection,file, setFile, title, desc, location,medium}) => {
    const {url, progress} = useStorage(collection,file,title, desc, location,medium);
    console.log(progress);

    useEffect(() => {
       if(url){
           setFile(null);
       }
    }, [url,setFile])

    return (
        <ProgressContainer>
            <ProgressBarSlider
                initial = {{ width: 0}}
                animate = {{ width: progress + '%'}}
            ></ProgressBarSlider>
        </ProgressContainer>
    )
}

export default ProgressBar
