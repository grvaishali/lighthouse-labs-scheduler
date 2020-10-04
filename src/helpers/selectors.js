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


export const getInterview = (state, interview) => {

  if (interview) {

    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }

  } else {

    return null;

  }
}; 