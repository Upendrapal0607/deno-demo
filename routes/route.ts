import {
  createData,
  getData,
  updateData,
  deleteData,
} from "../controller/controller.ts";
import { Router } from "../deps.ts";
const router = new Router();

router
  .get("/", getData)
  .post("/", createData)
  .patch("/:id", updateData)
  .delete("/:id", deleteData);

export default router;
