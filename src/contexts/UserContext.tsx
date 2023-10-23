import { User } from "../api-clients/User";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserStoreProps {
	children: React.ReactNode;
}

export const UserContext = createContext({} as any);

export const UserStorage = ({ children }: UserStoreProps) => {
	const [isLogged, setLoginStatus] = useState(false);
	const [user, setUser] = useState({});
	const [type, setType] = useState("");
	const [id, setID] = useState("");
	const [token, setToken] = useState(sessionStorage.getItem("user_token") as string);
	const navigate = useNavigate();


	const signIn = (email: string, password: string) => {
		return new User().signIn(email, password)
			.then(dataUser => dataUser.toObject())
			.then(dataUser => {
				if (
					!([dataUser.id, dataUser.index, dataUser.type, dataUser.token]).some(item => item === undefined)
				) {
					setUser(dataUser)
					setID(dataUser.id as string);
					setType(dataUser.type as string);
					setToken(dataUser.token as string);
					sessionStorage.setItem('user_token', dataUser.token as string);
					setLoginStatus(true);
					navigate('/home')
				}
			})
			.catch(console.error)
	};

	const logOut = () => {
		sessionStorage.removeItem('user_token');
		setLoginStatus(false);
	}

	return (
		<UserContext.Provider
			value={{
				isLogged,
				user,
				id,
				token,
				type,
				signIn,
				logOut,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}