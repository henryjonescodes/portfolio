import React, {useState} from 'react'
import LinkBar from '../components/Common/LinkBar'
import RoutedSideBar from '../components/Common/RoutedSideBar'
import ImageGrid from '../components/ImageScroller/ImageGrid/ImageGrid';
import Modal from '../components/ImageScroller/Modal/Modal';
// import Title from '../components/Common/Title';
import UploadForm from '../components/ImageScroller/UploadForm/UploadForm';

const Photography = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedImg, setSelectedImg] = useState(null);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <RoutedSideBar isOpen = {isOpen} toggle = {toggle} />
            <LinkBar toggle = {toggle} lightColor={false} title = "Photography"/>
            <UploadForm/>
            <ImageGrid setSelectedImg ={setSelectedImg}/>
            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg ={setSelectedImg}/>}
        </>
    )
}

export default Photography