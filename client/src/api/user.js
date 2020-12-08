import axios from 'axios'

export const addUser = async (formData) => {
    return await axios.post(`http://localhost:5000/api/v1/user`, formData)
    
}
export const getUsers = async () => await axios.get(`http://localhost:5000/api/v1/users`)

