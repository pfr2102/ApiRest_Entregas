import { Router } from "express";
import * as ordersController from "../controllers/ordenes.controller";

const router = Router();

router.get('/', ordersController.GetAllOrders);
router.get('/one', ordersController.GetOneOrderByID);
router.post('/', ordersController.AddOneOrder);
router.put('/', ordersController.UpdateOneOrder);
router.patch('/one', ordersController.UpdatePatchOneOrder);
router.delete('/', ordersController.DeleteOneOrder);

export default router;
