import { NextFunction, Request, Response } from 'express';
import { pool } from '../modal/database';
import { appError } from '../lib/error';

export async function insertData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      name,
      type,
      description,
      base_distance_in_km,
      base_price = 10,
      km_price,
      zone,
    } = req.body;

    if (
      !name ||
      !type ||
      !description ||
      !base_distance_in_km ||
      !km_price ||
      !zone
    ) {
      return next(appError(400, 'Invaild inputs'));
    }

    if (base_price < 10) {
      return next(appError(400, 'Base value cant be less than 10'));
    }
    await pool.query(
      'INSERT INTO organization(name) values($1) RETURNING id, name',
      [name]
    );

    await pool.query('INSERT INTO item(type,description) values($1,$2)', [
      type,
      description,
    ]);
    await pool.query(
      'INSERT INTO pricing(organization_id, item_id,base_distance_in_km,base_price,km_price,zone)  SELECT o.id AS organization_id, i.id AS item_id, $3, $4, $5, $6 FROM organization o INNER JOIN item i  ON o.id = i.id AND i.type = $2 AND i.description = $7 WHERE o.name = $1;',
      [name, type, base_distance_in_km, base_price, km_price, zone, description]
    );

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
}
