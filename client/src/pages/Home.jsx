import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImGoogle3 } from "react-icons/im";
import { BsFacebook } from "react-icons/bs";
import {
	handleLoginApi,
	handleLoginGoogleApi,
} from "../redux/requestApi/authApi";
function Home() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			email,
			password,
		};
		if (newUser) {
			handleLoginApi(newUser, dispatch, navigate);
		} else {
			alert("Please enter your input");
		}
	};
	const handleLoginGoogle = async (e) => {
		e.preventDefault();
		handleLoginGoogleApi(dispatch, navigate);
	};
	return (
		<div className="w-full h-full absolute bg-gray-700">
			<div className="">
				<div className="w-[500px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border-solid border-2 border-black">
					<form className="p-10">
						<div className="text-center text-4xl text-gray-500 font-bold">
							SIGN IN
						</div>
						<div className="mb-5">
							<label
								htmlFor="email"
								className="text-xl text-gray-500 font-bold"
							>
								Email
							</label>
							<div>
								<input
									id="email"
									name="email"
									type="email"
									className="border-2 border-solid border-gray-400 w-full h-10 outline-none text-xl"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="password"
								className="text-xl text-gray-500 font-bold"
							>
								Password
							</label>
							<div className="mb-1 h-10">
								<input
									id="password"
									name="password"
									type="password"
									className="border-2 border-solid border-gray-400 w-full h-full outline-none text-xl"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex justify-between mb-10">
							<a href="/#" className="text-blue-600">
								Đăng kí tài khoản
							</a>
							<a href="/#" className="text-blue-600">
								Quên mật khẩu
							</a>
						</div>
						<div className="flex justify-center gap-10 mb-10">
							<ImGoogle3
								className="text-4xl text-red-600 cursor-pointer"
								onClick={(e) => handleLoginGoogle(e)}
							/>
							<BsFacebook className="text-4xl text-blue-700 cursor-pointer" />
						</div>
						<button
							disabled={!email || !password ? true : false}
							type="submit"
							className="w-full h-[40px] border-2 border-solid border-gray-400 mb-5 font-bold text-gray-500 
						hover:bg-gray-500 hover:text-white"
							onClick={(e) => handleSubmit(e)}
						>
							LOGIN
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Home;
