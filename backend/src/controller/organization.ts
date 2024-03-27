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

export async function getOrganizationById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { organizationId } = req.params;
    if (!organizationId) {
      return next(appError(400, 'Organization ID is missing '));
    }

    const query = await pool.query(
      `SELECT p.zone,name,description,p.zone,i.type,p.base_price,p.km_price from organization as o inner join item i on o.id = i.id inner join pricing p on p.organization_id = o.id where o.id = $1`,
      [organizationId]
    );
    const data = query.rows;
    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
}
