
// This function transforms the api data to a more component based system
// To give a better performance, I consolidated the lists and components by 
// merging their ids

export function transform(data){
	let new_data = [];
	if (data.lists && data.lists.length == 0) {
		return new_data
	}
	data.lists.map(item => {
		let new_item = {
			id:item.id,
			components:[]
		}
		item.components.map(comp => {
			let index = data.components.findIndex(e => e.id == comp);
			if (index >= 0) {
				new_item.components.push(data.components[index])
			}
		})
		new_data.push(new_item);
	})

	return new_data;
}