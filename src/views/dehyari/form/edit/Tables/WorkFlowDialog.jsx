import { Button, Drawer, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import CustomIconButton from "@core/components/mui/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import DividerSimple from "@components/common/Divider/DividerSimple";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import UserInfoItem from './UserInfoItem'; // فرض کنید مسیر فایل UserInfoItem.js است

const WorkFlowDrawer = ({ open, setDialogOpen }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => setDialogOpen(false)}
            PaperProps={{
                sx: { width: 350 }
            }}
        >
            <Grid className={'p-5'}>
                <div className={'flex w-full justify-end'}>
                    <Tooltip title="بستن" placement={'top'}>
                        <CustomIconButton
                            onClick={() => setDialogOpen(false)}
                            className={"rounded-full"}
                        >
                            <i className="ri-close-line" />
                        </CustomIconButton>
                    </Tooltip>
                </div>
                <DividerSimple title={'بررسی حکم کارگزینی'} />
                <div className={'flex justify-center gap-5 mt-5'}>
                    <Chip
                        label={"بررسی حکم"}
                        onClick={() => { }}
                        clickable
                        variant='outlined'
                        className='text-textPrimary'
                        sx={{
                            boxShadow: 2,
                            borderWidth: 1,
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                            },
                        }}
                    />
                    <Chip
                        label={"سوابق درخواست"}
                        onClick={() => { }}
                        clickable
                        variant='outlined'
                        className='text-textPrimary'
                        sx={{
                            boxShadow: 0,
                            borderWidth: 1,
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                            },
                        }}
                    />
                </div>
                <DialogContent>
                    <Box className={'flex flex-col gap-3'}>
                        <UserInfoItem icon="ri-user-line" label="نام کاربر" value="علی نوریان زاده" />
                        <UserInfoItem icon="ri-government-line" label="پست سازمانی" value="دهیار" />
                        <UserInfoItem icon="ri-community-line" label="اسم روستا" value="چم جنگل" />
                        <UserInfoItem icon="ri-file-line" label="نوع قرارداد" value="19 روز" />
                        <UserInfoItem icon="ri-calendar-line" label="تاریخ شروع قرارداد" value="-" />
                        <UserInfoItem icon="ri-wallet-2-line" label="جمع حقوق و دستمزد" value="-" />
                    </Box>
                    <TextField
                        label="توضیحات"
                        fullWidth
                        sx={{ mt: 3 }}
                    />
                </DialogContent>
            </Grid>
            <DialogActions className={'justify-center'}>
                <Button onClick={() => {
                }} color="error" variant={'contained'}>
                    عدم تایید حکم
                </Button>
                <Button onClick={() => {
                }} color="success" variant={'contained'}>
                    تایید حکم
                </Button>
            </DialogActions>
        </Drawer>
    );
}

export default WorkFlowDrawer;