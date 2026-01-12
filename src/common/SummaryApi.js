export const baseURL = import.meta.env.VITE_BACKEND_URL

const summaryApi = {
    registerRider: {
        url: '/api/riders/register',
        method: 'post'
    },
    loginRider: {
        url: '/api/riders/login',
        method: 'post'
    },
    getRiderdetails: {
        url: '/api/riders/me',
        method: 'get'
    }
}

export default summaryApi