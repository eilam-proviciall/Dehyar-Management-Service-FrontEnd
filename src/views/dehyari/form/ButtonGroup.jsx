import { Button, Card, CardContent } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import {getSalary} from "@/Services/Salary";
import MyDocument from "@components/MyDocument";
import {pdf} from "@react-pdf/renderer";
import {toast} from "react-toastify";

const ButtonGroup = ({ onSubmit }) =>{
    const handleDownload = async () => {
        // const queryParams = new URLSearchParams(window.location.search);
        // const id = queryParams.get('id');

        // try {
            // const response = await axios.get(getSalary(id), {
            //     headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` },
            // });
            // const data = response.data;
            const doc = <MyDocument  />;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            const url = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            iframe.style.position = 'fixed';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            iframe.onload = () => {
                iframe.contentWindow.print();
            };
        // } catch (err) {
            // toast.error("Error fetching salary data");
        // }
    };
    return(
        <Card>
            <CardContent className='flex flex-col gap-4'>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={onSubmit}
                    style={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                        marginTop: '20px',
                    }}
                >
                    ذخیره
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={handleDownload}
                >
                    حکم کارگزینی
                </Button>
                <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
                    اطلاعات پرسنلی
                </Button>
                <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
                    پروفایل
                </Button>
            </CardContent>
        </Card>
    )
};

export default ButtonGroup;
