import api from "src/http/index";

export default class AppointmentService {
  static async getAppointments() {
    return api.get("appointments");
  }

  static async editAppoint(id, appoint, date) {
    const { customer, doctor, complaint } = appoint;
    return api.patch("editAppointment", {
      id: id,
      customer: customer,
      doctor: doctor,
      date: date,
      complaint: complaint,
    });
  }

  static async createAppont(user, visit) {
    const { customer, doctor, date, complaint } = visit;
    return api.post("createappointment", {
      customer: customer,
      doctor: doctor,
      date: date,
      complaint: complaint,
    });
  }

  static async deleteAppointment(id) {
    return api.delete("deleteAppointment", { data: { appointId: id } });
  }
}
