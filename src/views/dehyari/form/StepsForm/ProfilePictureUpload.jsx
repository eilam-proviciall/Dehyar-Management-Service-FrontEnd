import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const CustomGrid = styled(Grid)(({ theme }) => ({
    maxWidth: '300px',
    minWidth: '350px',
    margin: '0 auto',
}));

const CenteredGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
}));

const ProfilePictureUpload = ({ onNext, onBack }) => {
    const { getValues, setValue } = useFormContext();
    const [files, setFiles] = useState([]);

    const handleFileChange = (fileItems) => {
        setFiles(fileItems);
        if (fileItems.length > 0) {
            const base64 = fileItems[0].getFileEncodeBase64String();
            setValue('profilePicture', base64);
        }
    };

    const handleSubmit = () => {
        const values = getValues();
        onNext();
    };

    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <CenteredGrid item xs={12}>
                    <Typography className='font-medium' color='text.primary'>
                        عکس پروفایل
                    </Typography>
                    <Typography variant='body2'>لطفا عکس پروفایل  را آپلود کنید</Typography>
                </CenteredGrid>
                <FilePond
                    files={files}
                    onupdatefiles={handleFileChange}
                    allowMultiple={false}
                    name="file"
                    labelIdle='عکس خود را اینجا بکشید یا <span class="filepond--label-action">انتخاب کنید</span>'
                    acceptedFileTypes={['image/png', 'image/jpeg']}
                    maxFileSize='200KB'
                    fileValidateTypeLabelExpectedTypes='فقط فایل‌های PNG و JPG مجاز هستند'
                    fileValidateSizeLabelMaxFileSizeExceeded='حجم فایل نباید بیشتر از 200KB باشد'
                    fileValidateSizeLabelMaxFileSize='حجم فایل مجاز: {filesize}'
                />
            </CardContent>
        </Card>
    );
};

export default ProfilePictureUpload;
