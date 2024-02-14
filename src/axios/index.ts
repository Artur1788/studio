import axios from 'axios';

const ipAddress = JSON.parse(sessionStorage.getItem('ip') as string) as string;
const sessionID = JSON.parse(
  sessionStorage.getItem('SessionID') as string,
) as string;

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL as string;
axios.defaults.headers.common['ip'] = ipAddress;
axios.defaults.headers.common['SessionID'] = sessionID;
// axios base configs
// axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   code below for the future auth token
//   config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

export default axios;
