import { Router, Request, Response } from "express";
import asyncWrapper from "../utilities/async-wrapper";
import Service from "../services";

const router: Router = Router();
const service: Service = new Service();

/** @route   GET /
 *  @desc    Get Root
 *  @access  Public
 */
router.get(
  "/",
  asyncWrapper(async (req: Request, res: Response): Promise<any> => {
    service.emitHostType(req.headers);
    res.sendStatus(204);
  })
);

export default router;
