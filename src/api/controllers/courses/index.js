import { Router } from "express";
import controller from "./controller.js";


const router = Router();

router.route('/list').get(controller.register);

export default router;