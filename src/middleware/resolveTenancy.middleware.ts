import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/constants.config";
import { getConnection } from "../services/tenant/connectionManager";
import jwt, { type JwtPayload } from "jsonwebtoken";

/*
The following function needs to know which organization/tenant the user is associated with.
The function will extract the tenants connection from the cache and attach it to the future requests.
*/


const resolveTenancy = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Unauthorized.' });
  }

  const token = authHeader.split(' ')[1];

  try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Extract dbName from token and get the connection from the cache.
      const tenantName = decoded.tenantName;
      if (!tenantName) {
        return res.status(400).send({ error: 'Error resolving tenancy: dbName not found in token.' });
      }

      // Attach the db to the request object
      req.tenantName = tenantName;
      next();

  } catch (error) {
      res.status(401).send({ error: 'Unauthorized.' });
  }

  };
  
export { resolveTenancy }