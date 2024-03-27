import express from 'express';
import { calculatePricing } from '../controller/pricing';

const pricingRouter = express.Router();

pricingRouter.post('/calculate-pricing', calculatePricing);

export default pricingRouter;
