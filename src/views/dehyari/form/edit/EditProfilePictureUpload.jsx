import React, { useState, useRef, useEffect } from 'react';
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const EditProfilePictureUpload = ({ defaultProfilePicture }) => {
    const { setValue, watch } = useFormContext();
    const [files, setFiles] = useState([]);
    const pondRef = useRef(null);
    const firstName = watch('firstName');
    const lastName = watch('lastName');

    useEffect(() => {
        if (defaultProfilePicture) {
            setFiles([
                {
                    source: `data:image/jpeg;base64,${defaultProfilePicture}`,
                    options: {
                        type: 'local',
                        file: {
                            name: 'profile-picture.jpg',
                            size: defaultProfilePicture.length,
                            type: 'image/jpeg',
                        },
                    },
                },
            ]);
            setValue('profilePicture', `data:image/jpeg;base64,${defaultProfilePicture}`); // ذخیره base64 در فرم
        }
    }, [defaultProfilePicture, setValue]);

    const handleFileChange = (fileItems) => {
        if (fileItems.length > 0) {
            const file = fileItems[0].file;
            const maxSizeInBytes = 200 * 1024; // 200KB
            const validTypes = ['image/png', 'image/jpeg'];

            if (file.size > maxSizeInBytes) {
                toast.error('حجم فایل نباید بیشتر از 200KB باشد');
                pondRef.current.removeFile(fileItems[0].id);
                return;
            }

            if (!validTypes.includes(file.type)) {
                toast.error('فقط فایل‌های PNG و JPG مجاز هستند');
                pondRef.current.removeFile(fileItems[0].id);
                return;
            }

            const base64 = fileItems[0].getFileEncodeBase64String();
            setValue('profilePicture', base64);
        } else {
            setValue('profilePicture', '');
        }
        setFiles(fileItems);
    };

    return (
        <>
            <Card>
                <CardContent className="flex flex-col gap-4">
                    <CenteredGrid item xs={12}>
                        <Typography className="font-medium" color="text.primary">
                            عکس پروفایل
                        </Typography>
                        <Typography variant="body2">لطفا عکس پروفایل را آپلود کنید</Typography>
                    </CenteredGrid>
                    <FilePond
                        ref={pondRef}
                        files={files}
                        onupdatefiles={handleFileChange}
                        allowMultiple={false}
                        name="file"
                        labelIdle='عکس خود را اینجا بکشید یا <span class="filepond--label-action">انتخاب کنید</span>'
                        acceptedFileTypes={['image/png', 'image/jpeg']}
                        maxFileSize="200KB"
                        fileValidateTypeLabelExpectedTypes="فقط فایل‌های PNG و JPG مجاز هستند"
                        fileValidateSizeLabelMaxFileSizeExceeded="حجم فایل نباید بیشتر از 200KB باشد"
                        fileValidateSizeLabelMaxFileSize="حجم فایل مجاز: {filesize}"
                    />
                    {firstName && lastName && (
                        <CenteredGrid item xs={12}>
                            <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                                {`${firstName} ${lastName}`}
                            </Typography>
                        </CenteredGrid>
                    )}
                </CardContent>
            </Card>
            <ToastContainer />
        </>
    );
};

export default EditProfilePictureUpload;