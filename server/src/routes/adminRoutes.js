const express = require("express");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  createDoctorController, 
  getAllDoctorsController,
  updateDoctorController,
  addLeaveController,
} = require("../controllers/adminController");

router.post(
  "/doctor",
  protect,
  authorize("admin"),
  createDoctorController
);
router.get(
  "/doctors",
  protect,
  authorize("admin"),
  getAllDoctorsController
);
router.put(
  "/doctor/:id",
  protect,
  authorize("admin"),
  updateDoctorController
);
router.put(
    "/doctor/:id/leave",
    protect,
    authorize("admin"),
    addLeaveController
);
module.exports = router;