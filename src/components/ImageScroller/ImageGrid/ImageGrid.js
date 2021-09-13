import React, { useState } from 'react';
import useFirestore from '../../../hooks/useFirestore';
// import {motion} from 'framer-motion';
import {GalleryImage, 
        ImageContainer, 
        ImageWrap, 
        StyledMasonry
    } from './ImageGridElements';

function imageOrientation(src){
    var orientation,
    img = new Image();
    img.src = src;

    if(img.naturalWidth > img.naturalHeight){
        orientation = true;
    } else if (img.naturalWidth < img.naturalHeight){
        orientation = false;
    } else {
        orientation = null;
    }
    console.log(src, orientation);

    return orientation;
}

const breakpoints = {
    default: 3,
    1100: 2,
    600: 1
}

const ImageGrid = ({setSelectedImg, gallery}) => {
    const { docs } = useFirestore(gallery);
    console.log("docs",docs);
    return (
        <ImageContainer>
            <StyledMasonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {docs && docs.map(doc => (
                    <ImageWrap key={doc.id}
                        layout
                        whileHover={{ opacity: 1}}
                        onClick={() => setSelectedImg(doc)}>
                        <GalleryImage src={doc.downloadURL} alt={doc.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </ImageWrap>
                ))}
            </StyledMasonry>
        </ImageContainer>
    );
}

export default ImageGrid;
