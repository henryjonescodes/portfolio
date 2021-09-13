import React, {useState} from 'react'
import { ThemeProvider } from 'styled-components';
import { LabelButton } from '../../Common/ButtonElements';
import ProgressBar from '../ProgressBar/ProgressBar';
import { theme } from '../theme';
import { FormBar, FormField, FormInput, FormLabel, FieldWrapper, StyledLabel, StatusBar, FormTextarea, FormColumn, ButtonWrapper, FormFileInput } from './UploadFormElements';

const UploadForm = ({gallery}) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [collection, setCollection] = useState(gallery);
    const [state, setState] = useState({
        description: "",
        title: "",
        location: "",
        medium: ""
    });
    const allowedTypes = ['image/png', 'image/jpeg']

    function handleSubmit(e){
        e.preventDefault();
        if (selected && allowedTypes.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            console.log("Filetype Invalid");
            setFile(null);
            setError('Please select a valid format (PNG/JPEG)');
        }
        e.target.reset();
        setSelected(null);
        console.log("Submitted form");
    }

    function handleInputChange(e){
        e.preventDefault();
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });

        //Get file path
        if(e.target.name === "uploadFile"){
            console.log("Uploading File");
            setSelected(e.target.files[0]);
            setError('');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <FormBar onSubmit={handleSubmit}>
                <FormColumn> 
                    <FieldWrapper>
                        <StyledLabel>Title</StyledLabel>
                        <FormField type="text" name="title" onChange={handleInputChange}/>
                    </FieldWrapper>              
                    <FieldWrapper>
                        <StyledLabel>Description</StyledLabel>
                    </FieldWrapper>
                    <FormTextarea name="description" onChange={handleInputChange}/>
                </FormColumn>
                <FormColumn>
                    <FieldWrapper>
                        <StyledLabel>Medium</StyledLabel>
                        <FormField type="text" name="medium" onChange={handleInputChange}/>
                    </FieldWrapper>
                    <FieldWrapper>
                        <StyledLabel>Location</StyledLabel>
                        <FormField type="text" name="location" onChange={handleInputChange}/>
                    </FieldWrapper>
                    <ButtonWrapper>
                        <FieldWrapper>
                                <LabelButton>Upload
                                    <FormFileInput type="file" name="uploadFile" onChange = {handleInputChange}/> 
                                </LabelButton>
                        </FieldWrapper>
                        <FieldWrapper>
                                <LabelButton>Submit
                                    <FormInput type="submit" name="submitButton"/> 
                                </LabelButton>
                        </FieldWrapper>
                    </ButtonWrapper>
                    {selected && <FieldWrapper>
                                    <StyledLabel>{selected.name}</StyledLabel>
                                </FieldWrapper>}
                </FormColumn>
            </FormBar>
            <StatusBar>
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar
                    collection ='images' 
                    file={file} 
                    setFile={setFile}
                    title={state.title}
                    desc={state.description}
                    location={state.location}
                    medium={state.medium}/>}
            </StatusBar>
        </ThemeProvider>
    )
}

export default UploadForm
