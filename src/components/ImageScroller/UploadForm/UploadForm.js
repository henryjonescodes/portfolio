import React, {useState} from 'react'
import ProgressBar from '../ProgressBar/ProgressBar';
import { FormContainer, FormInput, FormLabel } from './UploadFormElements';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const allowedTypes = ['image/png', 'image/jpeg']

    const changeHandler = (e) => {
        console.log("Uploading File");
        let selected = e.target.files[0];
        console.log(selected);

        if (selected && allowedTypes.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            console.log("Filetype Invalid");
            setFile(null);
            setError('Please select a valid format (PNG/JPEG)');
        }
    }

    return (
        <FormContainer>
            <FormLabel>
                <FormInput type="file" onChange = {changeHandler}/>
                <span>+</span>
            </FormLabel>
        {/* // <form>
        //     <label>
        //         <input type="file" onChange = {changeHandler}/>
        //         <span>+</span>
        //     </label> */}
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
        {/* </form> */}
        </FormContainer>

    )
}

export default UploadForm
