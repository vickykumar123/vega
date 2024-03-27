import express from 'express';
import {
  getAllOrganization,
  getOrganizationById,
} from '../controller/organization';

const organizationRouter = express.Router();

organizationRouter.get('/', getAllOrganization);
organizationRouter.get('/:organizationId', getOrganizationById);

export default organizationRouter;
