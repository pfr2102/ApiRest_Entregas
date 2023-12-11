import { Router } from "express";
import * as personasController from '../controllers/personas.controller';

const router = Router();

router.get('/', personasController.getPersonasAll);

export default router;  