import React,{useState,useEffect,useCallback} from 'react'
import {toast} from 'react-toastify'
import {addCompany,getCompanies} from '../api/company'
import CompanyItem from '../components/CompanyItem'

const initialState ={
    name : '',
    city:''
}
const Company = () => {

    const [formData, setFormData] = useState(initialState)
    const [companies,setCompanies] = useState([])
    const [loading, setLoading] = useState(false)

    const getCompanyList = useCallback(() => {
        getCompanies().then(res=>setCompanies(res.data))
    },[])

    useEffect(() => {
        getCompanyList()
        
    }, [getCompanyList])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        
    
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true)
        addCompany(formData).then(res => {
            console.log(res);
            setLoading(false)
            toast.success(`Company ${res.data.name} added successfully`)
            getCompanyList();
        }).catch(err => {
            console.log(err);
            setLoading(false)
            toast.error(err.response.data.err)
        })
    }
    
    return (
    <>
        <form onSubmit={handleSubmit} className='p-5'>
            <h1>Add Company</h1> 
        <div className="form-group">
            <label > Name</label>
            <input type="text"
                placeholder='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='form-control'
            />
        </div>
        <div className="form-group">
            <label > City</label>
            <input type="text"
            placeholder='city'
            name='city'
            value={formData.city}
            onChange={handleChange}
            required
            className='form-control'
        />
            </div>
            <button className='btn btn-raised' disabled={!formData.name || !formData.city|| loading}>Submit</button>
        </form>  
            {companies && companies.length > 0 && companies.map(c => <CompanyItem key={c._id} company={c}/>)}
     </>   
    )
}

export default Company
