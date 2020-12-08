import Company from '../models/Company.js';
import User from '../models/User.js'

export const addUser = async (req,res) => {
    try {
        const newUser = await new User(req.body).save()
        if (newUser) {
            res.status(201).json(newUser)
        }
    } catch (err) {
        console.log('User creation failed==>',err);
        if (err.code === 11000) {
            return res.status(400).json({
                err:'User already exists'
            })
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                err:'Please provide necessary inputs'
            })
        }
        res.status(500).send('Internal Server Error')
    }
}

export const listUsers = async(req,res) => {
    const users = await User.find({}).populate('companies', ['name']).select({ name: 1, email: 1, phone: 1, _id: -1, companies: 1 }).exec()
    console.log(users);
    //Creating Response
    let userList = []
    
    users.forEach(user => {
        let prettyUser={}
        prettyUser.name = user.name
        prettyUser.phone = user.phone
        prettyUser.email = user.email
        prettyUser.assignedCompanies = user.companies.map(company=>company.name).join(',')
        
    
        console.log(prettyUser);
        userList.push(prettyUser);
    })
    console.log(userList);

    res.status(200).json(userList);
}

export const addUserCompany = async (req,res)=>  {
    
    try {
        //check if company exists 
        const company = await Company.findById(req.params.c_id);
        const user = await User.findById(req.params.u_id)
        if (company && user) {
            if (user.companies.includes(company._id)) {
                console.log('returning without actual update');
                return res.json(user)
            }
            user.companies.push(company._id);
            const updatedUser = await user.save();
            // const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, { companies: { ...companies, company } }, { new: true })
            res.status(201).json(updatedUser);
        }

    } catch (err) {
        console.log('error adding user company',err);
        res.send('server Error')
    }
}