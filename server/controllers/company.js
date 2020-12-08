import Company from '../models/Company.js'

export const addCompany = async (req,res) => {
    try {
        
        const newCompany = await new Company(req.body).save()
        if (newCompany) {
            res.status(201).json(newCompany)
        }
    } catch (err) {
        console.log('Company creation failed==>',err);
        if (err.code === 11000) {
            return res.status(400).json({
                err:'Company already exists'
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

export const listCompanies = async(req,res) => {
    const companies = await Company.find({}).exec()
    res.status(200).json(companies)
}


