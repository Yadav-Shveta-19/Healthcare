import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date) {
      fetchSlots();
    }
  }, [date]);

  const fetchSlots = async () => {
    try {
      const res = await API.get(
        `/patient/slots?doctorId=${doctorId}&date=${date}`
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        setSlots([]);
        return;
      }

      if (res.data.leave) {
        toast.info("Doctor is on leave on this date.");
        setSlots([]);
        return;
      }

      setSlots(res.data.slots || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load slots.");
      setSlots([]);
    }
  };

  const bookAppointment = async () => {
    if (!date || !selectedSlot || !symptoms.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/patient/appointment", {
        doctorProfileId: doctorId,
        appointmentDate: date,
        appointmentTime: selectedSlot,
        symptoms,
      });

      toast.success(res.data.message || "Appointment Booked Successfully");

      navigate("/patient");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Appointment booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6">
          Book Appointment
        </h2>

        <label className="font-semibold">
          Appointment Date
        </label>

        <input
          type="date"
          className="w-full border rounded p-3 mt-2 mb-5"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setSelectedSlot("");
          }}
        />

        <label className="font-semibold">
          Available Slots
        </label>

        <select
          className="w-full border rounded p-3 mt-2 mb-5"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">Select Slot</option>

          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <label className="font-semibold">
          Symptoms
        </label>

        <textarea
          rows="4"
          className="w-full border rounded p-3 mt-2"
          placeholder="Describe your symptoms..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button
          onClick={bookAppointment}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;