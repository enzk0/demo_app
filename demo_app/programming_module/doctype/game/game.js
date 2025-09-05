// Copyright (c) 2025, enzk0 and contributors
// For license information, please see license.txt

frappe.ui.form.on("Game", {
	start_date_and_time: function (frm) {
		frm.trigger("calculate_duration");
	},

	end_date_and_time: function (frm) {
		frm.trigger("calculate_duration");
	},

	calculate_duration: function (frm) {
		if (frm.doc.start_date_and_time && frm.doc.end_date_and_time) {
			let start = new Date(frm.doc.start_date_and_time);
			let end = new Date(frm.doc.end_date_and_time);

			let duration = Math.floor((end - start) / (1000 * 60));
			frm.set_value("duration", duration);
		}
	},
});
