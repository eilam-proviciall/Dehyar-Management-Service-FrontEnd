// React Imports
import {useState, useEffect, forwardRef, useCallback} from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import {useForm, Controller} from 'react-hook-form'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Slice Imports
import {addEvent, deleteEvent, updateEvent, selectedEvent} from '@/redux-store/slices/calendar'

// Vars
const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const defaultState = {
    url: '',
    title: '',
    guests: [],
    allDay: true,
    description: '',
    endDate: new Date(),
    calendar: 'Business',
    startDate: new Date()
}

const CreateMunicipalityUserSidebar = props => {
    // Props
    const {calendarStore, dispatch, addEventSidebarOpen, handleAddEventSidebarToggle} = props
    console.log(234234)
    // States
    const [values, setValues] = useState(defaultState)

    const PickersComponent = forwardRef(({...props}, ref) => {
        return (
            <TextField
                inputRef={ref}
                fullWidth
                {...props}
                label={props.label || ''}
                className='is-full'
                error={props.error}
            />
        )
    })

    // Hooks
    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const {
        control,
        setValue,
        clearErrors,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues: {title: ''}})

    const resetToStoredValues = useCallback(() => {
        if (calendarStore.selectedEvent !== null) {
            const event = calendarStore.selectedEvent

            setValue('title', event.title || '')
            setValues({
                url: event.url || '',
                title: event.title || '',
                allDay: event.allDay,
                guests: event.extendedProps.guests || [],
                description: event.extendedProps.description || '',
                calendar: event.extendedProps.calendar || 'Business',
                endDate: event.end !== null ? event.end : event.start,
                startDate: event.start !== null ? event.start : new Date()
            })
        }
    }, [setValue, calendarStore.selectedEvent])

    const resetToEmptyValues = useCallback(() => {
        setValue('title', '')
        setValues(defaultState)
    }, [setValue])

    const handleSidebarClose = () => {
        setValues(defaultState)
        clearErrors()
        dispatch(selectedEvent(null))
        handleAddEventSidebarToggle()
    }

    const onSubmit = data => {
        const modifiedEvent = {
            url: values.url,
            display: 'block',
            title: data.title,
            end: values.endDate,
            allDay: values.allDay,
            start: values.startDate,
            extendedProps: {
                calendar: capitalize(values.calendar),
                guests: values.guests && values.guests.length ? values.guests : undefined,
                description: values.description.length ? values.description : undefined
            }
        }

        if (
            calendarStore.selectedEvent === null ||
            (calendarStore.selectedEvent !== null && !calendarStore.selectedEvent.title.length)
        ) {
            dispatch(addEvent(modifiedEvent))
        } else {
            dispatch(updateEvent({...modifiedEvent, id: calendarStore.selectedEvent.id}))
        }

        handleSidebarClose()
    }

    const handleDeleteButtonClick = () => {
        if (calendarStore.selectedEvent) {
            dispatch(deleteEvent(calendarStore.selectedEvent.id))
        }

        // calendarApi.getEventById(calendarStore.selectedEvent.id).remove()
        handleSidebarClose()
    }

    const handleStartDate = date => {
        if (date > values.endDate) {
            setValues({...values, startDate: new Date(date), endDate: new Date(date)})
        }
    }

    const RenderSidebarFooter = () => {
        if (
            calendarStore.selectedEvent === null ||
            (calendarStore.selectedEvent && !calendarStore.selectedEvent.title.length)
        ) {
            return (
                <div className='flex gap-4'>
                    <Button type='submit' variant='contained'>
                        افزودن
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={resetToEmptyValues}>
                        بازنشانی
                    </Button>
                </div>
            )
        } else {
            return (
                <div className='flex gap-4'>
                    <Button type='submit' variant='contained'>
                        Update
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={resetToStoredValues}>
                        Reset
                    </Button>
                </div>
            )
        }
    }

    const ScrollWrapper = isBelowSmScreen ? 'div' : PerfectScrollbar

    useEffect(() => {
        if (calendarStore.selectedEvent !== null) {
            resetToStoredValues()
        } else {
            resetToEmptyValues()
        }
    }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, calendarStore.selectedEvent])

    return (
        <Drawer
            anchor='right'
            open={addEventSidebarOpen}
            onClose={handleSidebarClose}
            ModalProps={{keepMounted: true}}
            sx={{'& .MuiDrawer-paper': {width: ['100%', 400]}}}
        >
            <Box className='flex justify-between items-center sidebar-header pli-5 plb-4 border-be'>
                <Typography variant='h5'>
                    افزودن کاربر جدید
                </Typography>
                {calendarStore.selectedEvent && calendarStore.selectedEvent.title.length ? (
                    <Box className='flex items-center' sx={{gap: calendarStore.selectedEvent !== null ? 1 : 0}}>
                        <IconButton size='small' onClick={handleDeleteButtonClick}>
                            <i className='ri-delete-bin-7-line text-2xl'/>
                        </IconButton>
                        <IconButton size='small' onClick={handleSidebarClose}>
                            <i className='ri-close-line text-2xl'/>
                        </IconButton>
                    </Box>
                ) : (
                    <IconButton size='small' onClick={handleSidebarClose}>
                        <i className='ri-close-line text-2xl'/>
                    </IconButton>
                )}
            </Box>
            <ScrollWrapper
                {...(isBelowSmScreen
                    ? {className: 'bs-full overflow-y-auto overflow-x-hidden'}
                    : {options: {wheelPropagation: false, suppressScrollX: true}})}
            >
                <Box className='sidebar-body p-5'>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <FormControl fullWidth className='mbe-5'>
                            <Controller
                                name='title'
                                control={control}
                                rules={{required: true}}
                                render={({field: {value, onChange}}) => (
                                    <TextField
                                        label='نام و نام خانوادگی'
                                        value={value}
                                        onChange={onChange}
                                        {...(errors.title && {error: true, helperText: 'This field is required'})}
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth className='mbe-5'>
                        <Controller
                            name='nid'
                            control={control}
                            rules={{required: true}}
                            render={({field: {value, onChange}}) => (
                                <TextField
                                    label='کد ملی'
                                    value={value}
                                    onChange={onChange}
                                    {...(errors.title && {error: true, helperText: 'This field is required'})}
                                />
                            )}
                        />
                    </FormControl>
                        <FormControl fullWidth className='mbe-5'>
                            <InputLabel id='event-calendar'>نقش</InputLabel>
                            <Select
                                label='Calendar'
                                value={values.calendar}
                                labelId='event-calendar'
                                onChange={e => setValues({...values, calendar: e.target.value})}
                            >
                                <MenuItem value='Personal'>امور مالی</MenuItem>
                                <MenuItem value='Business'>ناظر فنی</MenuItem>
                                <MenuItem value='Family'>دفتر امور روستایی</MenuItem>
                                <MenuItem value='Holiday'>بخشدار</MenuItem>
                                <MenuItem value='ETC'>دهیار</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='flex items-center'>
                            <RenderSidebarFooter/>
                        </div>
                    </form>
                </Box>
            </ScrollWrapper>
        </Drawer>
    )
}

export default CreateMunicipalityUserSidebar
