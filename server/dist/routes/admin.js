"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controller/admin");
const router = (0, express_1.Router)();
router.post("/admin/register", admin_1.registerAdmin);
router.post("/admin/login", admin_1.loginAdmin);
router.get("/admin/:id", admin_1.getAdmin);
router.get("/admins", admin_1.getAllAdmin);
router.delete("/admin/delete/:id", admin_1.deleteAdmin);
router.put("/admin/update/:id", admin_1.updateAdmin);
exports.default = router;
//# sourceMappingURL=admin.js.map