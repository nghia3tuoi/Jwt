import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import {
	handleDeleteUsersApi,
	handleGetUsersApi,
} from "../redux/requestApi/userApi";
import { handleLogoutApi } from "../redux/requestApi/authApi";
import { createAxios } from "../services/createInstance";
import { loginSuccess } from "../redux/createSlice/authSlice";
import Pagination from "../containers/component/pagination";
// import queryString from "query-string";
function User() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = useSelector(
		(state) => state.auth.login.data?.accessToken
	);
	const user = useSelector((state) => state.auth.login?.data);
	//
	const listUser = useSelector((state) => state.users.getUsers.data?.users);
	let axiosJWT = createAxios(user, loginSuccess, dispatch);
	//
	const handleGetUser = async (paramsString) => {
		await handleGetUsersApi(paramsString, accessToken, dispatch, axiosJWT);
	};
	const handleDeleteUsers = async (id) => {
		await handleDeleteUsersApi(id, accessToken, dispatch, navigate, axiosJWT);
		handleGetUser(filters);
	};
	const handleLogout = () => {
		handleLogoutApi(accessToken, dispatch, navigate, axiosJWT);
	};
	//get all count model
	// const totalRows = useSelector((state) => state.users.getUsers.data?.count);
	const [pagination, setPagination] = useState({
		_page: 1,
		_limit: 3,
		_totalRows: 10,
	});
	const [filters, setFilters] = useState({
		_page: 1,
		_limit: 3,
	});
	const handlePageChange = (newPage) => {
		setPagination({ ...pagination, _page: newPage });
		setFilters({ ...filters, _page: newPage });
	};
	useEffect(() => {
		if (!user) {
			navigate("/");
		}
		if (user?.accessToken) {
			// _limit=2&_page=2
			// const paramsString = queryString.stringify(filters);
			handleGetUser(filters);
			setPagination(pagination);
		}
	}, [filters]);
	return (
		<div className="w-full h-screen bg-slate-700">
			<div className="text-white w-full h-[50px] border-b-2 border-solid border-gray-500 flex justify-end items-center">
				<ul className="flex">
					<li className="mr-4 text-xl font-bold text-white cursor-pointer hover:opacity-[0.7]">
						Home
					</li>
					<li className="mr-4 text-xl font-bold text-white">Welcome,</li>
					<li className="mr-4 text-xl font-bold text-white cursor-pointer hover:opacity-[0.7]">
						<div onClick={() => handleLogout()}>Logout</div>
					</li>
				</ul>
			</div>
			<div className="w-[700px] h-full mx-auto">
				<div>
					<div className="text-center text-4xl font-bold mb-10 text-pink-700">
						List Users
					</div>
					<div className="text-3xl mb-5 text-red-400 cursor-pointer">
						<FaRegTrashAlt />
					</div>
					<div className=" text-xl">
						{listUser?.map((user, index) => {
							return (
								<div
									key={index}
									className=" p-5 border-2 border-solid border-pink-400 h-[50px] flex items-center font-bold text-white justify-between mb-5"
								>
									<div className="">{user.email}</div>
									<div
										className="hover:text-red-600 cursor-pointer"
										onClick={() => handleDeleteUsers(user._id)}
									>
										<RiDeleteBack2Fill className="" />
									</div>
								</div>
							);
						})}
						<Pagination
							pagination={pagination}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default User;
