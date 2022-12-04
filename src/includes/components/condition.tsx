import React from "react";



export function Condition(props: any) {
	let { conditions, children, variables } = props;

	// this function determines if the conditions should render the list or not
	// This allows for multiple AND conditions so that when they are all active,
	// the list will render
	function checkActive(conditions: any) {
		let active = [];
		if (conditions && conditions.length > 0) {
			conditions.forEach((cond:any) => {
				let variable = variables.filter((e: any) => e.name === cond.options.variable);
				if (variable.length > 0) {
					if (cond.options.value === variable[0].initialValue) {
						active.push(true)
					}
				}
			})
		}
		return active.length === conditions.length;
	}
	return (
		<div className={checkActive(conditions) ? "" : "hidden"}>
			{ children }
		</div>
	)
}


