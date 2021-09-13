import React, { useState } from 'react'
import ImageGrid from '../ImageGrid/ImageGrid';
import Modal from '../Modal/Modal';
import UploadForm from '../UploadForm/UploadForm';
import { GalleryWrapper } from './ImageGalleryElements';

const ImageGallery = ({gallery}) => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <GalleryWrapper>
            <UploadForm gallery = {gallery}/>
            <ImageGrid setSelectedImg ={setSelectedImg} gallery = {gallery}/>
            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg ={setSelectedImg}/>}
        </GalleryWrapper>
    )
}

export default ImageGallery
