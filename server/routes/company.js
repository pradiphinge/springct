import express from 'express'

import { addCompany,listCompanies } from '../controllers/company.js'

const router = express.Router();

router.get('/companies', listCompanies);
router.route('/company').post(addCompany)

export default router;
