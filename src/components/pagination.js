import React from "react"
import { Link } from "gatsby"

const Pagination = ({ first, last, index, pageCount }) => {
	return (
		<div>
			{!!first || (
				<Link to={index === 2 ? "/" : `/${(index - 1).toString()}`}>
					&#8249;
				</Link>
			)}
			<div>
				<PageNums index={index} pageCount={pageCount} />
			</div>
			{!!last || <Link to={`/${(index + 1).toString()}`}>&#8250;</Link>}
		</div>
	)
}

export default Pagination

// if index dont show left arrow, if last don't show right arrow
// while lastpage is less than 5 render a list from 1 to lastpage index
// if last page is bigger than 5 render 1 to 3 ... 9 10 then if now index is 3 render 3 4 5 .. 9 10
// then make a check if index + 3 >= lastpage - 3 if true render loop from index to lastpage
const PageNums = ({ index, pageCount }) => {
	const range = (from, to, step = 1) => {
		let i = from
		const range = []

		while (i <= to) {
			range.push(i)
			i += step
		}
		return range
	}

	if (pageCount <= 5) {
		return (
			<ul>
				{range(1, pageCount).map(num => (
					<li key={"key_" + num}>
						<Link to={`/${num}`}>{num}</Link>
					</li>
				))}
			</ul>
		)
	} else if (pageCount > 5) {
		return (
			<ul>
				{range(index, index + 5).map(num => (
					<li key={"key_" + num}>
						<Link to={`/${num}`}>{num}</Link>
					</li>
				))}
			</ul>
		)
	} else if (pageCount - 5 >= index) {
		return (
			<ul>
				{range(pageCount - 5, pageCount).map(num => (
					<li key={"key_" + num}>
						<Link to={`/${num}`}>{num}</Link>
					</li>
				))}
			</ul>
		)
	}
}
