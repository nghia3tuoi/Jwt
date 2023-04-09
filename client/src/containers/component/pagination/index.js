import { useEffect, useState } from "react";

function Pagination(props) {
	let { pagination, onPageChange } = props;
	let { _page, _limit, _totalRows } = pagination;
	//tổng số pages
	let totalPages = Math.ceil(_totalRows / _limit);
	const [arrPages, setArrPages] = useState([]);
	useEffect(() => {
		for (let i = 1; i <= totalPages + 1; i++) {
			setArrPages((prev) => [...prev, i]);
		}
	}, []);
	function handlePageChange(newPage) {
		if (onPageChange) {
			onPageChange(newPage);
		}
	}
	return (
		<div className="flex gap-5 justify-center">
			<button
				disabled={_page <= 1}
				onClick={() => handlePageChange(_page - 1)}
				className="border-2 border-solid border-r-gray-400 p-2 bg-slate-500"
			>
				Prev
			</button>
			<div>
				<ul className="flex gap-5">
					{arrPages.map((item, index) => {
						return (
							<li
								key={index}
								className="border-2 border-solid border-r-gray-400 p-2 bg-slate-500 cursor-pointer"
								onClick={() => {
									onPageChange(item);
								}}
							>
								{item}
							</li>
						);
					})}
				</ul>
			</div>
			<button
				disabled={_page >= totalPages}
				onClick={() => {
					return handlePageChange(_page + 1);
				}}
				className="border-2 border-solid border-r-gray-400 p-2 bg-slate-500"
			>
				Next
			</button>
		</div>
	);
}

export default Pagination;
