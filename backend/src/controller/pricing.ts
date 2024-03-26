import { NextFunction, Request, Response } from 'express';
import { appError } from '../lib/error';
// import { pool } from '../modal/database';
import pricing from '../classes/pricing';
import { pool } from '../modal/database';

export async function calculatePricing(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { zone, total_distance, item_type } = req.body;
    const { organization_id } = req.params;
    if (!organization_id) {
      return next(appError(400, 'Organization ID is missing'));
    }

    console.log(zone, total_distance, item_type);

    if (!zone || !total_distance || !item_type) {
      return next(appError(400, 'Invalid Input'));
    }
    const getOrganizationPrice = await pool.query(
      `SELECT base_price,base_distance_in_km from pricing where organization_id = $1`,
      [organization_id]
    );
    const priceData = getOrganizationPrice.rows[0];
    const totalPrice = pricing.calculateTotalPrice(
      priceData.base_price,
      total_distance,
      item_type
    );

    res.status(200).json({
      status: 'success',
      totalPrice,
    });
  } catch (err) {
    next(err);
  }
}
