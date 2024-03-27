import express from 'express';
import { getAllOrganization } from '../controller/organization';

const organizationRouter = express.Router();

organizationRouter.get('/', getAllOrganization);

export default organizationRouter;
