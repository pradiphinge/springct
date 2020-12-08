import axios from 'axios'

export const addCompany = async (formData) => {
    return await axios.post(`http://localhost:5000/api/v1/company`, formData)
    
}
export const getCompanies = async()=>await axios.get(`http://localhost:5000/api/v1/companies`)