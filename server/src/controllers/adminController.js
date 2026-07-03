const { createDoctor, 
  getAllDoctors,
  updateDoctor,
  addLeaveDay,
 } = require("../services/adminService");

const createDoctorController = async (req, res) => {
  try {
    const result = await createDoctor(req.body);

    return res.status(201).json(result);

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create doctor",
    });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await getAllDoctors();

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateDoctorController = async (req, res) => {
  try {
    const doctor = await updateDoctor(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      doctor,
    });

  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const addLeaveController = async (req, res) => {

    try {

        const doctor = await addLeaveDay(
            req.params.id,
            req.body.leaveDate
        );

        res.status(200).json({
            success:true,
            message:"Leave Added Successfully",
            doctor
        });

    } catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};
module.exports = {
  createDoctorController,
  getAllDoctorsController,
  updateDoctorController,
  addLeaveController,
};