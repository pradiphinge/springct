import React,{useState,useEffect,useCallback} from 'react'
import {toast} from 'react-toastify'
import { Select} from 'antd'
import { addUser, getUsers } from '../api/user'
import {getCompanies} from '../api/company'
import UserItem from '../components/UserItem'
const { Option } = Select;


const initialState = {
    name : '',
    email: '',
    phone: '',
    companies: [],
    company:''
}
const User = () => {

    const [formData, setFormData] = useState(initialState)
    const [companiesOps,setCompaniesOps] = useState([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);
    const getCompanyList = useCallback(() => {
        getCompanies().then(res => {
            setCompaniesOps(res.data)
            
        })
    },[])
    const getUserList = useCallback(() => {
        getUsers().then(res=>setUsers(res.data))
    },[])
    useEffect(() => {
        getUserList()
        getCompanyList()
    }, [getCompanyList,getUserList])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        
    
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true)
        addUser(formData).then(res => {
            console.log(res);
            setLoading(false)
            toast.success(`User ${res.data.name} added successfully`)
            getUserList();
        }).catch(err => {
            console.log(err);
            setLoading(false)
            toast.error(err.response.data.err)
        })
    }
    
    return (
    <>
        <form onSubmit={handleSubmit} className='p-5'>
            <h1>Add User</h1> 
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
            <label > Email</label>
            <input type="email"
            placeholder='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='form-control'
                    />
                
        </div>
        <div className="form-group">
            <label > Phone</label>
            <input type="text"
            placeholder='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='form-control'
                    />
                
            </div>
            <div>
                <Select mode='multiple'
                        placeholder='Please Select'
                        style={{ width: '100%' }}
                        
                    value={formData.companies}
                    onChange={(value) => {
                        setFormData({...formData,companies:value})
                    }}
                > {companiesOps.map(c => (<Option key={c._id} value={c._id}>{c.name}</Option>))} 
                </Select>
            </div> 
			        
            <hr/>    
            <button className='btn btn-raised' disabled={!formData.name || !formData.email|| loading}>Submit</button>
        </form>  
            {users && users.length > 0 && users.map(c => <UserItem key={c._id} user={c} />)}
            
     </>
    )
}

export default User