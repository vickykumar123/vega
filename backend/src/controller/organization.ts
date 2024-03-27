import { NextFunction, Request, Response } from 'express';
import { pool } from '../modal/database';
import { appError } from '../lib/error';

export async function getAllOrganization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organization = await pool.query(
      `SELECT * from organization as o inner join item i on o.id = i.id `
    );
    if (!organization) {
      return next(appError(404, 'No organisation'));
    }
    const response = organization.rows;
    res.status(200).json({
      response,
    });
  } catch (error) {
    next(error);
  }
}
