import React, { useEffect, useState } from 'react'
import { Error, FormContainer, FormInput, FormLabel, InputContainer, OutputContainer, ProgressBarSlider, ProgressContainer, Status, StyledInput, StyledInputField, StyledInputLabel } from './UploaderElements';
import useStorage from '../../../hooks/useStorage';

const ProgressBar = ({file, setFile, formData}) => {
    const {url, progress} = useStorage(
        "gallery1",
        file,
        formData.key,
        formData.title, 
        formData.description
    )
    console.log(progress)

    useEffect(() =>{
        if(url){
            setFile(null)
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

const Uploader = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const initialFormData = Object.freeze({
        title: "",
        description: "",
        key: 0
    })
    const [formData, updateFormData] = useState(initialFormData);

    const allowedTypes = ['image/png', 'image/jpeg']
    
    const reset = () => { 
        document.getElementById("form").reset();
    }
      
    const handleChange = (e) => {
        updateFormData({
            ...formData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Uploading File");
        let selected = e.target.files[0];
        console.log(selected);
       
        if (selected && allowedTypes.includes(selected.type)) {
            setFile(selected);
            reset();
            setError('');
        } else {
            console.log("Filetype Invalid");
            setFile(null);
            setError('Please select a valid format (PNG/JPEG)');
        }
    }

    return (
        <FormContainer id="form">
            <InputContainer>
                <StyledInputLabel>Key</StyledInputLabel>
                <StyledInput type="number" name="key" onChange={handleChange} />
            </InputContainer>
            <InputContainer>
                <StyledInputLabel>Title</StyledInputLabel>
                <StyledInput type="text" name="title" onChange={handleChange} />
            </InputContainer>
            <InputContainer>
                <StyledInputLabel>Description</StyledInputLabel>
                <StyledInputField name="description" onChange={handleChange} />
            </InputContainer>
            <FormLabel>
                <FormInput type="file" onChange = {handleSubmit}/>
                <span>+</span>
            </FormLabel>
            <OutputContainer>
                {error && <Error className="error">{error}</Error>}
                {file && <Status>{file.name}</Status>}
                {file && <ProgressBar file={file} setFile={setFile} formData={formData}/>}
            </OutputContainer>
        </FormContainer>
    )
}

export default Uploader
