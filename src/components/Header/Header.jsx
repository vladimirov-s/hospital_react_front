import axios from "axios";
import jsCookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { url } from "components/helper/constants";
import { Button } from "@mui/material";
import { Hospital } from "components/pics";
import "./style.scss";

const Header = ({ headText, logout }) => {
	const nav = useNavigate();
	const goOut = () => {
		const accessToken = localStorage.getItem("accesToken");
		axios
			.post(`${url}/logout`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					withCredentials: true,
				},
			})
			.then((res) => {
				nav("/");
			});
	};

	return (
		<header className='header'>
			<Hospital need='logo' />
			<h2 className='header__headtext'>{headText}</h2>
			{logout ? (
				<Button onClick={goOut} variant='contained'>
					Bыход
				</Button>
			) : (
				false
			)}
		</header>
	);
};

export default Header;
