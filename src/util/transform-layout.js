
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
			if (comp.type !== "condition") {
				let index = data.components.findIndex(e => e.id === comp);
				if (index >= 0) {
					new_list.components.push(data.components[index])
				}
			}
		})
		new_data.push(new_list);
	})

	new_data.forEach(list => {
		let filtered = data.components.filter(e => e.children === list.id && e.type === "condition");
		if (filtered.length >= 0) {
			list.conditions = filtered;
		}
	})

	return new_data;
}