import React from 'react';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

function DividerSimple({title}) {
    return (
        <Divider sx={{marginBottom : "10px"}}>
            <Chip label={title} size="small"/>
        </Divider>
    );
}

export default DividerSimple;