const generateSlots = (startTime, endTime, slotDuration) => {
  const slots = [];

  let [startHour, startMinute] = startTime.split(":").map(Number);
  let [endHour, endMinute] = endTime.split(":").map(Number);

  let start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  while (start + slotDuration <= end) {
    const hour = Math.floor(start / 60);
    const minute = start % 60;

    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
    );

    start += slotDuration;
  }

  return slots;
};

module.exports = generateSlots;