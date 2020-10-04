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

export const getInterviewersForDay = (state, day) => {

  const interviewersForDay = [];

  state.days.forEach((dayOfWeek) => {

    if (dayOfWeek.name === day) {

      dayOfWeek.interviewers.forEach((interviewerId) => {
        interviewersForDay.push(state.interviewers[interviewerId]);
      })
    }

  });

  return interviewersForDay.length ? interviewersForDay : [];

}

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

