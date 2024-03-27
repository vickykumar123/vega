import express from 'express';
import {
  getAllOrganization,
  getOrganizationById,
} from '../controller/organization';
import { insertData } from '../controller/insertData';

const organizationRouter = express.Router();

organizationRouter.get('/', getAllOrganization);
organizationRouter.get('/:organizationId', getOrganizationById);
organizationRouter.post('/insert', insertData);

export default organizationRouter;
