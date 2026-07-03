import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState({});
  const [prescriptions, setPrescriptions] = useState({});

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/doctor/appointments");
      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const completeAppointment = async (id) => {
    try {
      const res = await API.put(`/doctor/appointment/${id}`, {
        doctorNotes: notes[id] || "",
        prescription: prescriptions[id] || "",
      });

      toast.success("Appointment Completed");

      fetchAppointments();

      console.log(res.data);
    } catch (error) {
      toast.error("Failed to complete appointment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Doctor Dashboard
      </h1>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        appointments.map((app) => (
          <div
            key={app._id}
            className="bg-white p-5 mb-5 rounded shadow"
          >
            <h2 className="text-xl font-semibold">
              Patient: {app.patient.fullName}
            </h2>

            <p>Date: {app.appointmentDate}</p>
            <p>Time: {app.appointmentTime}</p>
            <p>Symptoms: {app.symptoms}</p>

            {/* Notes */}
            <textarea
              placeholder="Doctor Notes"
              className="w-full border p-2 mt-3"
              onChange={(e) =>
                setNotes({
                  ...notes,
                  [app._id]: e.target.value,
                })
              }
            />

            {/* Prescription */}
            <textarea
              placeholder="Prescription"
              className="w-full border p-2 mt-2"
              onChange={(e) =>
                setPrescriptions({
                  ...prescriptions,
                  [app._id]: e.target.value,
                })
              }
            />

            <button
              onClick={() => completeAppointment(app._id)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            >
              Mark Completed
            </button>

            {app.aiPostVisitSummary && (
              <div className="mt-3 p-3 bg-blue-100">
                <strong>AI Summary:</strong>
                <p>{app.aiPostVisitSummary}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorDashboard;