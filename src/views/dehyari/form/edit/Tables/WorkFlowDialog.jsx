import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import CustomIconButton from "@core/components/mui/IconButton";
import {toast} from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import DividerSimple from "@components/common/Divider/DividerSimple";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const WorkFlowDialog = ({open, setDialogOpen}) => {
    return <Dialog open={open} onClose={() => setDialogOpen(false)}>
        <Grid className={'p-5'}>
                <Tooltip title="بستن" placement={'top'}>
                    <CustomIconButton
                        onClick={() => setDialogOpen(false)}
                        className={"rounded-full"}
                    >
                        <i className="ri-close-line"/>
                    </CustomIconButton>
                </Tooltip>
                {/*<DialogTitle>بررسی حکم کارگزینی</DialogTitle>*/}
            <DividerSimple title={'بررسی حکم کارگزینی'}/>
            <DialogContent>
                <Typography mb={5}>
                    تایید حکم کارگزینی علی نوریان زاده دهیار چم جنگل با قرارداد <span className={"text-red-700"}>17 روز کار کرد</span>
                </Typography>
                <TextField
                    label="توضیحات"
                    fullWidth
                />
            </DialogContent>

        </Grid>
            <DialogActions>
                <Button onClick={() => {
                }} color="error" variant={'contained'}>
                    عدم تایید حکم
                </Button>
                <Button onClick={() => {
                }} color="success" variant={'contained'}>
                    تایید حکم
                </Button>
            </DialogActions>
    </Dialog>
}

export default WorkFlowDialog;