import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmin,
  deleteAdmin,
  updateAdmin,
  getAllAdmin,
} from "../controller/admin";

const router = Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/:id", getAdmin);
router.get("/admins", getAllAdmin);
router.delete("/admin/delete/:id", deleteAdmin);
router.put("/admin/update/:id", updateAdmin);

export default router;
