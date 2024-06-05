import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Repeater from "@core/components/Repeater";
import Box from "@mui/material/Box";
import {Collapse, Icon} from "@mui/material";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function ChildrenStep(props) {
    const [childrens, setChildrens] = useState(1)

    return (
        <>
            <Grid item xs={12} sm={12} spacing={30}>

                        <Repeater count={childrens}>
                            {i => {
                                const Tag = i === 0 ? Box : Collapse
                                return (
                                    <Tag key={i}
                                         className='repeater-wrapper' {...(i !== 0 ? {in: true} : {})}>

                                        <Card sx={{mb: 2}}>
                                            <CardContent >
                                                <Grid container>
                                                    <Grid item lg={12} md={5} xs={12}
                                                          sx={{px: 4, my: {lg: 0, xs: 4}}} pt={3}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label='کد ملی'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label='نام و نام خانوادگی'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <FormControl fullWidth size="small">
                                                                    <InputLabel>جنسیت</InputLabel>
                                                                    <Select
                                                                        label='جنسیت'
                                                                    >
                                                                        <MenuItem value='UK'>مرد</MenuItem>
                                                                        <MenuItem value='USA'>زن</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label='تاریخ تولد'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label='تاریخ ازدواج'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label='پایان معافیت تحصیلی'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    size="small"
                                                                    fullWidth
                                                                    label='تاریخ وفات'
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                    </Tag>
                                )
                            }}
                        </Repeater>
                        <Grid item xs={12} sx={{px: 0}} pt={5}>
                            <Button
                                size='small'
                                variant='contained'
                                startIcon={<Icon icon='mdi:plus' fontSize="20"/>}
                                onClick={() => setChildrens(childrens + 1)}
                            >
                                افزودن
                            </Button>
                        </Grid>



            </Grid>

        </>
    );
}

export default ChildrenStep;