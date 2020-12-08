import express from 'express'


import { addUser,listUsers,addUserCompany } from '../controllers/user.js'

const router = express.Router();

router.get('/users', listUsers)

router.post('/user',addUser);
router.post('/addcompanytouser/:u_id/:c_id',addUserCompany)
export default router;