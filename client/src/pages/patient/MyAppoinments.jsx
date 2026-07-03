import { useEffect, useState } from "react";
import API from "../../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/patient/appointments");
      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((app) => (
          <div
            key={app._id}
            className="bg-white p-5 rounded shadow mb-5"
          >
            <h2 className="text-xl font-bold">
              Doctor: {app.doctor.fullName}
            </h2>

            <p>
              Date:{" "}
              {new Date(app.appointmentDate).toLocaleDateString()}
            </p>

            <p>Time: {app.appointmentTime}</p>

            <p>Status: {app.status}</p>

            <p>Symptoms: {app.symptoms}</p>

            {app.doctorNotes && (
              <>
                <h3 className="font-bold mt-3">
                  Doctor Notes
                </h3>
                <p>{app.doctorNotes}</p>
              </>
            )}

            {app.prescription && (
              <>
                <h3 className="font-bold mt-3">
                  Prescription
                </h3>
                <p>{app.prescription}</p>
              </>
            )}

            {app.aiPostVisitSummary && (
              <div className="bg-blue-100 p-3 mt-3 rounded">
                <strong>AI Summary</strong>
                <p>{app.aiPostVisitSummary}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;