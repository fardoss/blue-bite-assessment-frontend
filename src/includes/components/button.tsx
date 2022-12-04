import React from "react";

import ShowIcon from "../../icons/show.svg";
import HideIcon from "../../icons/hide.svg";

export function Button(props: any){
	let { data } = props;

	return (
		<div className="button-component-wrapper">
			<p className="title">{data.options.text}</p>
			<div className="footer-wrap">
				{
					data.options.value == "show" ?
					<img src={ShowIcon} />
					: data.options.value == "hide" ?
					<img src={HideIcon} />
					:
					null
				}
			</div>
		</div>
	)
}
