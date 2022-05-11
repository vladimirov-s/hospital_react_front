import $api from "../http";
import axios from "axios";

export default class AuthService {
	static async login(username, password) {
		return $api.post();
	}
}
