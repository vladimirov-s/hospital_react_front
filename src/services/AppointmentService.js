import api from "src/http/index";

export default class AppointmentService {
  static async getAppointments() {
    return api.get("");
  }

  static async editAppoint(id, appointment, date) {
    const { customer, doctor, complaint } = appointment;
    return api.patch(id, {
      customer,
      doctor,
      complaint,
      date,
    });
  }

  static async createAppont(visit) {
    return api.post("", visit);
  }

  static async deleteAppointment(id) {
    return api.delete(id);
  }
}
