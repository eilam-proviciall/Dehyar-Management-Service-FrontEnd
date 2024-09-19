// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import ContentLoader from 'react-content-loader'

const HorizontalWithSubtitle = props => {
  // Props
  const { title, value, avatarIcon, avatarColor, trend: trend, trendNumber: trendNumber, subtitle: subtitle, loading } = props

  return (
    <Card>
      <CardContent className='flex justify-between gap-1'>
        {
          loading ? <ContentLoader
            speed={1}
            height={100}
            foregroundColor="#b7adff"
            backgroundColor='#eeeeee'
            {...props}
          >
            <rect x="103" y="12" rx="3" ry="3" width="123" height="7" />
            <circle cx="44" cy="42" r="38" />
            <rect x="105" y="48" rx="3" ry="3" width="171" height="6" />
          </ContentLoader>
            : <>
              <div className='flex flex-col gap-1 flex-grow'>
                <Typography color='text.primary'>{title}</Typography>
                <div className='flex items-center gap-2 flex-wrap'>
                  <Typography variant='h4'>{value}</Typography>
                  <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
                    {`(${trend === 'negative' ? '-' : '+'}${trendNumber})`}
                  </Typography>
                </div>
                <Typography variant='body2'>{subtitle}</Typography>
              </div>
              <CustomAvatar color={avatarColor} skin='light' variant='rounded' size={42}>
                <i className={classnames(avatarIcon, 'text-[26px]')} />
              </CustomAvatar>
            </>
        }
      </CardContent>
    </Card>
  )
}

export default HorizontalWithSubtitle
