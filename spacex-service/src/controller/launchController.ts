import { Request, Response } from 'express';
import { getLaunches } from '../service/launchService';
import { ApiParams } from '../types/apiParams';

/**
 * Fetches launches from the SpaceX API and sends the response.
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - A promise resolving to void.
 * @throws Will send a 500 response if fetching launches fails.
 */
export const fetchLaunches = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const query: { [key: string]: string | boolean } = {};

    if (req.query.success) query.success = true;
    if (req.query.failure) query.failure = true;
    if (req.query.upcoming) query.upcoming = true;
    if (req.query.search) query.search = req.query.search as string;
    const options: ApiParams = { limit, offset, query };
    const launches = await getLaunches(options);
    res.json(launches);
  } catch (error) {
    res.status(500).send('Error fetching launches');
  }
};
