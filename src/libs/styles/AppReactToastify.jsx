'use client'

// MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'

// Third-party Imports
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Styled Components
const ToastifyWrapper = styled(Box)(({ theme }) => {
  // Hooks
  const { settings } = useSettings();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(480));
  const isDarkMode = theme.palette.mode === 'light';

  return {
    ...(isSmallScreen && {
      '& .Toastify__toast-container': {
        marginBlockStart: theme.spacing(3),
        marginInline: theme.spacing(3),
        width: 'calc(100dvw - 1.5rem)'
      }
    }),
    '& .Toastify__toast': {
      minBlockSize: 46,
      borderRadius: '12px',
      padding: theme.spacing(1.5, 2.5),
      backgroundColor: isDarkMode ? '#fff' : 'var(--mui-palette-background-paper)',
      boxShadow: settings.skin === 'bordered' ? 'none' : 'var(--mui-customShadows-md)',
      border: settings.skin === 'bordered' && `1px solid ${theme.palette.divider}`,
      ...(isSmallScreen && {
        marginBlockEnd: theme.spacing(4)
      }),
      '&:not(.custom-toast)': {
        '& .Toastify__toast-body': {
          color: isDarkMode ? '#000' : '#fff',
        },
        '&.Toastify__toast--success': {
          backgroundColor: isDarkMode ? '#fff' : '#28a745',
          '& .Toastify__toast-icon svg': {
            fill: isDarkMode ? '#28a745' : '#fff'
          }
        },
        '&.Toastify__toast--error': {
          backgroundColor: isDarkMode ? '#fff' : '#ff4452',
          '& .Toastify__toast-icon svg': {
            fill: isDarkMode ? '#ff4452' : '#fff'
          }
        },
        '&.Toastify__toast--warning': {
          '& .Toastify__toast-icon svg': {
            fill: 'var(--mui-palette-warning-main)'
          }
        },
        '&.Toastify__toast--info': {
          '& .Toastify__toast-icon svg': {
            fill: 'var(--mui-palette-info-main)'
          }
        }
      }
    },
    '& .Toastify__toast-body': {
      margin: 0,
      lineHeight: 1.467,
      fontSize: theme.typography.body1.fontSize
    },
    '& .Toastify__toast-icon': {
      marginRight: theme.spacing(3),
      height: 20,
      width: 20,
      '& .Toastify__spinner': {
        margin: 3,
        height: 14,
        width: 14
      }
    },
    '& .Toastify__close-button': {
      color: isDarkMode ? '#000' : '#fff',
      alignSelf: 'center'
    }
  }
});

const AppReactToastify = props => {
  const { boxProps, direction = 'ltr', position = 'bottom-right' } = props

  const positionMap = {
    'top-right': 'top-left',
    'top-left': 'top-right',
    'bottom-left': 'bottom-right',
    'bottom-right': 'bottom-left',
    'top-center': 'top-center',
    'bottom-center': 'bottom-center'
  }

  // const position = direction === 'rtl' ? positionMap[themeConfig.toastPosition] : themeConfig.toastPosition

  return (
      <ToastifyWrapper {...boxProps}>
        <ToastContainer rtl={true} position={position} stacked  />
      </ToastifyWrapper>
  )
}

export default AppReactToastify