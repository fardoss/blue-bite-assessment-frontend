
// This function transforms the api data to a more component based system
// To give a better performance, I consolidated the lists and components by 
// merging their ids

// I also managed conditioning by merging children ids with their respective component instead of creating a new component

export function transform(data){
	let new_data = [];
	if (data.lists && data.lists.length === 0) {
		return new_data
	}
	data.lists.forEach(list => {
		let new_list  = {
			id:list.id,
			components:[]
		}
		list.components.forEach(comp => {
			let index = data.components.findIndex(e => e.id === comp);
			if (index >= 0) {

				// conditions will be tagged as an object in their respective children list ids, 
				// so we don't need to add them to the list components, (performance enhancement)
				if (data.components[index].type !== "condition") {
					new_list.components.push(data.components[index])
				}
			}
		})
		new_data.push(new_list);
	})

	// Map through each of the new data list components to tag conditions to each
	new_data.forEach(list => {
		let filtered = data.components.filter(e => e.children === list.id && e.type === "condition");
		if (filtered.length >= 0) {
			list.conditions = filtered;
		}
	})

	return new_data;
}