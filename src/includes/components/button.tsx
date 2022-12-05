import React from "react";

import ShowIcon from "../../icons/show.svg";
import HideIcon from "../../icons/hide.svg";
import LocationIcon from "../../icons/location.svg";

export function Button(props: any){
	let { data, changeVariable } = props;
	let { options } = data;

	if (!options) {
		return null
	}
	
	return (
		<div 
			className="button-component-wrapper"
			onClick={() => changeVariable(options.variable, options.value)}>
			<p className="title">{options.text}</p>
			<div className="footer-wrap">
				{
					options.value === "show" ?
					<img src={ShowIcon} alt="Show icon" />
					: options.value === "hide" ?
					<img src={HideIcon} alt="Hide icon" />
					:  options.variable === "location" ?
					<img className="location" src={LocationIcon} alt="Location icon" />
					:
					null
				}
			</div>
		</div>
	)
}
