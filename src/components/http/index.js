import axios from "axios";
import { url } from "component/helper/constAndValidate";

const $api = axios.create({
	withCredentials: true,
	baseURL: url,
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(
		"refreshToken"
	)}`;
	return config;
});

export default $api;
