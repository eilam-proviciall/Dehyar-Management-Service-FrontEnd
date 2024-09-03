import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiLinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import CustomAvatar from '@core/components/mui/Avatar'

const LinearProgress = styled(MuiLinearProgress)(() => ({
    '&.MuiLinearProgress-colorWarning': { backgroundColor: 'var(--mui-palette-primary-main)' },
    '& .MuiLinearProgress-bar': {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
    }
}))

const FamillyStatus = ({ population }) => {
    const totalPopulation = population.population || 0;
    const households = population.households || 0;
    const malePopulation = population.male || 0;
    const femalePopulation = population.female || 0;
    const malePercentage = totalPopulation ? (malePopulation / totalPopulation) * 100 : 0;
    const femalePercentage = totalPopulation ? (femalePopulation / totalPopulation) * 100 : 0;

    return (
        <Card>
            <CardContent className='flex justify-center items-start'>
                <div className='flex flex-col ' style={{textAlign: "center",justifyContent:"center"}}>
                    <Typography>تعداد خانوار</Typography>
                    <Typography variant='h4'>{households}</Typography>
                </div>
            </CardContent>
            <CardContent className='flex flex-col gap-[1.3125rem]'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-x-2'>
                            <CustomAvatar size={24} variant='rounded' skin='light' className='rounded' color='warning'>
                                <i className='ri-pie-chart-2-line text-base' />
                            </CustomAvatar>
                            <Typography>مرد</Typography>
                        </div>
                        <Typography variant='h4'>{malePercentage.toFixed(1)}%</Typography>
                        <Typography>{malePopulation}</Typography>
                    </div>
                    <Divider flexItem orientation='vertical' sx={{ '& .MuiDivider-wrapper': { p: 0, py: 2 } }}>
                        <CustomAvatar skin='light' color='secondary' size={28} className='bg-actionSelected'>
                            <Typography variant='body2'>VS</Typography>
                        </CustomAvatar>
                    </Divider>
                    <div className='flex flex-col items-end gap-2'>
                        <div className='flex items-center gap-x-2'>
                            <Typography>زن</Typography>
                            <CustomAvatar size={24} variant='rounded' skin='light' className='rounded' color='primary'>
                                <i className='ri-mac-line text-base' />
                            </CustomAvatar>
                        </div>
                        <Typography variant='h4'>{femalePercentage.toFixed(1)}%</Typography>
                        <Typography>{femalePopulation}</Typography>
                    </div>
                </div>
                <LinearProgress value={malePercentage} color='warning' variant='determinate' className='bs-2' />
            </CardContent>
        </Card>
    )
}

export default FamillyStatus
