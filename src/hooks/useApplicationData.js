import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));

    });
  }, []);

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview }).then(() => {
      axios.get('http://localhost:8001/api/days').then((res) => {
        setState(prev => ({
          ...prev,
          days: res.data
        }));
      })
    });
  }

  const cancelInterview = (id) => {

    const appointments = { ...state.appointments };

    appointments[id].interview = null;

    setState({
      ...state,
      appointments
    });

    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
      axios.get('http://localhost:8001/api/days').then((res) => {
        setState(prev => ({
          ...prev,
          days: res.data
        }));
      })
    });
  }



  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}