import axios from '@/utils/request'

export const getUsers = () =>
  axios({
    url: '/api/users',
    method: 'get'
  })
