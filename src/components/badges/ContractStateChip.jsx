import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from "@mui/material/Avatar";
import {useSettings} from "@core/hooks/useSettings";

const ContractStateChip = ({ avatar,label, onClick, customStyles }) => {
    const {settings} = useSettings();
    return (
        <Chip
            avatar={<Avatar className={`${avatar == "30" && "bg-success text-white" || avatar && "bg-backgroundPaper" || "bg-error text-white"}`}>{avatar == '30' && < i class="ri-check-line"/> || avatar || <i className={'ri-close-fill'}/>}</Avatar>}
            label={label}
            onClick={onClick}
            style={{ textAlign: 'right', ...customStyles }}
        />
    );
};

export default ContractStateChip;