import React from 'react';
import useFirestore from '../../../hooks/useFirestore';
// import {motion} from 'framer-motion';
import {GalleryImage, 
        ImageContainer,
        ImageWrap
    } from './ImageGridElements';

const ImageGrid = ({setSelectedImg}) => {
    const { docs } = useFirestore('images');
    console.log("docs",docs);
    return (
        <ImageContainer>
            {docs && docs.map(doc => (
                <ImageWrap key={doc.id}
                    layout
                    whileHover={{ opacity: 1}}
                    onClick={() => setSelectedImg(doc.downloadURL)}
                >
                    <GalleryImage src={doc.downloadURL} alt="uploaded pic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </ImageWrap>
            ))}
        </ImageContainer>
    );
}

export default ImageGrid;
