import React, { useEffect } from 'react';
import useStorage from '../../../hooks/useStorage';
// import { motion } from 'framer-motion';
import { ProgressBarSlider, ProgressContainer } from './ProgressBarElements';

const ProgressBar = ({file, setFile}) => {
    const {url, progress} = useStorage(file);
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
