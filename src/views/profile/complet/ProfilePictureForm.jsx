import React, { useState, useEffect } from 'react';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const CustomGrid = styled(Grid)(({ theme }) => ({
    maxWidth: '1300px',
    minWidth: '1300px',
    margin: '0 auto',
}));

const ProfilePictureForm = ({ onNext, onBack }) => {
    const { formData, updateFormData } = useFormContext();
    const [files, setFiles] = useState([]);

    const handleFileChange = (fileItems) => {
        setFiles(fileItems);
        if (fileItems.length > 0) {
            const base64 = fileItems[0].getFileEncodeBase64String();
            updateFormData({ profilePicture: base64 });
        }
    };

    const handleSubmit = () => {
        onNext();
    };

    useEffect(() => {
   }, [formData]);

    return (
        <CustomGrid container spacing={5}>
            <Grid item xs={12}>
                <Typography className='font-medium' color='text.primary'>
                    عکس پروفایل
                </Typography>
                <Typography variant='body2'>لطفا عکس پروفایل خود را آپلود کنید</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '20px' ,}}>
                <FilePond

                    files={files}
                    onupdatefiles={handleFileChange}
                    allowMultiple={false}
                    name="file"
                    labelIdle='عکس خود را اینجا بکشید یا <span class="filepond--label-action">انتخاب کنید</span>'
                />
            </Grid>
            <Grid item xs={12} className='flex justify-between'>
                <Button variant='outlined' onClick={onBack}>
                    بازگشت
                </Button>
                <Button variant='contained' onClick={handleSubmit}>
                    مرحله بعد
                </Button>
            </Grid>
        </CustomGrid>
    );
};

export default ProfilePictureForm;
