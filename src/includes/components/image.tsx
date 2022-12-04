import React from "react";


export function Image(props: any){
	let { data } = props;
	return (
		<div className="image-component-wrapper">
			<img
				alt={data.options.alt} 
				src={data.options.src} 
			/>
		</div>
	)
}
