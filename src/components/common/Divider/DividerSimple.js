import React from 'react';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

function DividerSimple({title}) {
    return (
        <Divider>
            <Chip label={title} size="small"/>
        </Divider>
    );
}

export default DividerSimple;