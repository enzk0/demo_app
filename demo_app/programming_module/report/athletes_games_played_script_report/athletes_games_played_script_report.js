// Copyright (c) 2025, enzk0 and contributors
// For license information, please see license.txt

frappe.query_reports["Athletes Games Played Script Report"] = {
	filters: [
		{
			fieldname: "athlete",
			label: __("Athlete"),
			fieldtype: "Link",
			options: "Athlete",
		},
		{
			fieldname: "name",
			label: __("Game"),
			fieldtype: "Link",
			options: "Game",
		},
		{
			fieldname: "competition",
			label: __("Competition"),
			fieldtype: "Link",
			options: "Competition",
		},
	],
};
