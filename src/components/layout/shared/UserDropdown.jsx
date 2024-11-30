'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Third-party Imports

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";

// Util Imports

// Styled component for badge content
const BadgeContentSpan = styled('span')({
    width: 8,
    height: 8,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: 'var(--mui-palette-success-main)',
    boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = ({ userDetails }) => {
    // States
    const [open, setOpen] = useState(false)

    // Refs
    const anchorRef = useRef(null)

    // Hooks
    const router = useRouter()
    const { settings } = useSettings()
    const { lang: locale } = useParams()

    const handleDropdownOpen = () => {
        !open ? setOpen(true) : setOpen(false)
    }

    const handleDropdownClose = (event, url) => {
        if (url) {
            router.push(getLocalizedUrl(url, locale))
        }

        if (anchorRef.current && anchorRef.current.contains(event?.target)) {
            return
        }

        setOpen(false)
    }

    const handleUserLogout = async () => {
        try {
            // Sign out from the app

            // Redirect to login page
            router.push(getLocalizedUrl('/login', locale))
        } catch (error) {
            console.error(error)

            // Show above error in a toast like following
            // toastService.error((err as Error).message)
        }
    }

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            toast.success("با موفقیت از سامانه خارج شدید");
            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        }
    };

    return (
        <>
            <Badge
                ref={anchorRef}
                overlap='circular'
                badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                className='mis-2'
            >
                <Avatar
                    ref={anchorRef}
                    // alt={session?.user?.name || ''}
                    // src={session?.user?.image || ''}
                    onClick={handleDropdownOpen}
                    className='cursor-pointer bs-[38px] is-[38px]'
                />
            </Badge>
            <ClickAwayListener onClickAway={handleDropdownClose}>
                <Popper
                    open={open}
                    transition
                    disablePortal
                    placement='bottom-end'
                    anchorEl={anchorRef.current}
                    className='min-is-[240px] !mbs-4 z-[1]'
                >
                    {({ TransitionProps, placement }) => (
                        <Fade
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
                            }}
                        >
                            <Paper
                                className={'p-4'}
                                elevation={settings.skin === 'bordered' ? 0 : 8}
                                {...(settings.skin === 'bordered' && { className: 'border' })}
                            >
                                <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                                    <Avatar alt={'تصویر پروفایل'} src={''} />
                                    <div className='flex items-start flex-col'>
                                        <Typography variant='body2' className='font-medium' color='text.primary'>
                                            {`${userDetails.first_name} ${userDetails.last_name}`}
                                        </Typography>
                                        <Typography variant='caption'>{userDetails.nid}</Typography>
                                    </div>
                                </div>
                                <Divider className='mb-2' />
                                <div className={'grid gap-2'}>
                                    <Button className="justify-start text-left" startIcon={<i className={'ri-user-line'} />} onClick={() => { toast.warning('این ویژگی به زودی افزوده میشود') }} color={'secondary'} fullWidth>پروفایل کاربری</Button>
                                    <Button className="justify-start text-left" startIcon={<i className={'ri-information-line'} />} onClick={() => { toast.warning('این ویژگی به زودی افزوده میشود') }} color={'secondary'} fullWidth>پشتیبانی</Button>
                                    <Button startIcon={<LogoutIcon />} onClick={logout} color={'error'} variant={'contained'} fullWidth>خروج از حساب کاربری</Button>
                                </div>
                                {/*<ClickAwayListener onClickAway={e => handleDropdownClose(e)}>*/}
                                {/*  <MenuList>*/}
                                {/*    <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>*/}
                                {/*      <Avatar alt={session?.user?.name || ''} src={session?.user?.image || ''} />*/}
                                {/*      <div className='flex items-start flex-col'>*/}
                                {/*        <Typography variant='body2' className='font-medium' color='text.primary'>*/}
                                {/*          {session?.user?.name || ''}*/}
                                {/*        </Typography>*/}
                                {/*        <Typography variant='caption'>{session?.user?.email || ''}</Typography>*/}
                                {/*      </div>*/}
                                {/*    </div>*/}
                                {/*    <Divider className='mlb-1' />*/}
                                {/*    <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/pages/user-profile')}>*/}
                                {/*      <i className='ri-user-3-line' />*/}
                                {/*      <Typography color='text.primary'>My Profile</Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*    <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/pages/account-settings')}>*/}
                                {/*      <i className='ri-settings-4-line' />*/}
                                {/*      <Typography color='text.primary'>Settings</Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*    <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/pages/pricing')}>*/}
                                {/*      <i className='ri-money-dollar-circle-line' />*/}
                                {/*      <Typography color='text.primary'>Pricing</Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*    <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/pages/faq')}>*/}
                                {/*      <i className='ri-question-line' />*/}
                                {/*      <Typography color='text.primary'>FAQ</Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*    <div className='flex items-center plb-1.5 pli-4'>*/}
                                {/*      <Button*/}
                                {/*        fullWidth*/}
                                {/*        variant='contained'*/}
                                {/*        color='error'*/}
                                {/*        size='small'*/}
                                {/*        endIcon={<i className='ri-logout-box-r-line' />}*/}
                                {/*        onClick={handleUserLogout}*/}
                                {/*      >*/}
                                {/*        Logout*/}
                                {/*      </Button>*/}
                                {/*    </div>*/}
                                {/*  </MenuList>*/}
                                {/*</ClickAwayListener>*/}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </ClickAwayListener>
        </>
    )
}

export default UserDropdown
