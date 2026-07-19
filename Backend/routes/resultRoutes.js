import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createResults,
  listResults
} from '../controllers/resultControllers.js';

const resultRouter = express.Router();
//create result
resultRouter.post('/', authMiddleware,createResults);

//list results
resultRouter.get('/list', authMiddleware, listResults);
export default resultRouter;