// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { user } from '@/Services/Auth/AuthService'
import { set } from 'js-cookie'
import { Skeleton } from '@mui/material'
import ContentLoader from 'react-content-loader'


const UserListCards = ({ loading, setLoading }) => {

  // States
  const [userList, setUserList] = useState([]);
  const [CFODetails, setCFODetails] = useState([]);
  const [monisipalityDetails, setMonisipalityDetails] = useState([]);
  const [bakhshdarDetails, setBakhshdarDetails] = useState([]);

  // Vars
  const data = [
    {
      title: 'کل کاربران',
      value: userList.length,
      avatarIcon: 'ri-group-line',
      avatarColor: 'primary',
      trend: 'positive',
      trendNumber: '0%',
      subtitle: '',
      loading: loading,
    },
    {
      title: ' مسئول امور مالی',
      value: CFODetails.length,
      avatarIcon: 'ri-user-add-line',
      avatarColor: 'error',
      trend: 'positive',
      trendNumber: '0%',
      subtitle: '',
      loading: loading,
    },
    {
      title: 'بخشدار',
      value: bakhshdarDetails.length,
      avatarIcon: 'ri-user-follow-line',
      avatarColor: 'success',
      trend: 'positive',
      trendNumber: '0%',
      subtitle: '',
      loading: loading,
    },
    {
      title: 'شهردار',
      value: '0',
      avatarIcon: 'ri-user-search-line',
      avatarColor: 'warning',
      trend: 'negative',
      trendNumber: '0%',
      subtitle: '',
      loading: loading,
    }
  ];

  const fetchData = () => {
    setLoading(true);
    axios.get(`${user()}?order_by=geo_region`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      setUserList(response.data.data[0]);
      setLoading(false);
      response.data.data[0].map(item => {
        item.work_group == 13 ? setCFODetails(prevItems => [...prevItems, item])
          : item.work_group == 14 ? setBakhshdarDetails(prevItems => [...prevItems, item])
            : null
      })
    }).catch(
      () => setLoading(false)
    );
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3} >
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
