// Copyright (c) 2025, enzk0 and contributors
// For license information, please see license.txt

frappe.ui.form.on("Athlete", {
	birthday: function (frm) {
		//autocompletes birthday (date)
		if (frm.doc.birthday) {
			let birthDate = new Date(frm.doc.birthday);
			let today = new Date();

			let age = today.getFullYear() - birthDate.getFullYear();
			let monthDiff = today.getMonth() - birthDate.getMonth();
			let dayDiff = today.getDate() - birthDate.getDate();

			// if birthday didn't happen yet
			if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
				age--;
			}

			frm.set_value("age", age);
		}
	},

	// full name autocomplete, for every field change calls set_full_name func
	first_name: function (frm) {
		frm.trigger("set_full_name");
	},
	middle_name: function (frm) {
		frm.trigger("set_full_name");
	},
	last_name: function (frm) {
		frm.trigger("set_full_name");
	},

	set_full_name: function (frm) {
		let full_name = "";
		if (frm.doc.first_name) {
			full_name += frm.doc.first_name + " ";
		}

		if (frm.doc.middle_name) {
			full_name += frm.doc.middle_name + " ";
		}

		if (frm.doc.last_name) {
			full_name += frm.doc.last_name;
		}
		frm.set_value("full_name", full_name.trim());
	},
});
