export const getAppointmentsForDay = (state, day) => {

  const appointmentsForDay = [];
  state.days.forEach((dayOfWeek) => {
    if (dayOfWeek.name === day) {
      dayOfWeek.appointments.forEach((appointmentId) => {
        appointmentsForDay.push(state.appointments[appointmentId]);
      })
    }
  });
  return appointmentsForDay.length ? appointmentsForDay : [];
};