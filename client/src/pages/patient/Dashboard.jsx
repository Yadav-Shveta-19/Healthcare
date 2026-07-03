import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/patient/doctors");
      setDoctors(res.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          Patient Dashboard
        </h1>

        <button
          onClick={() => navigate("/patient/appointments")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          My Appointments
        </button>
      </div>

      {/* Doctors */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-semibold">
                {doc.user.fullName}
              </h2>

              <p className="mt-3">
                <span className="font-semibold">
                  Specialization:
                </span>{" "}
                {doc.specialization}
              </p>

              <p>
                <span className="font-semibold">
                  Experience:
                </span>{" "}
                {doc.experience} Years
              </p>

              <p>
                <span className="font-semibold">
                  Consultation Fee:
                </span>{" "}
                ₹{doc.consultationFee}
              </p>

              <button
                onClick={() =>
                  navigate(`/patient/book/${doc._id}`)
                }
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Book Appointment
              </button>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default PatientDashboard;