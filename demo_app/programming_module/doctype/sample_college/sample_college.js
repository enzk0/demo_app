// Copyright (c) 2025, enzk0 and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sample College", {
	birthdate: function (frm) {
		if (frm.doc.birthdate) {
			let birthDate = new Date(frm.doc.birthdate);
			let today = new Date();

			let age = today.getFullYear() - birthDate.getFullYear();
			let monthDiff = today.getMonth() - birthDate.getMonth();
			let dayDiff = today.getDate() - birthDate.getDate();

			if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
				age--;
			}

			frm.set_value("age", age);
		}
	},

	// full name autocomplete, for every field change calls set_full_name func
	pangalan: function (frm) {
		frm.trigger("set_full_name");
	},
	pangalang_panggitna: function (frm) {
		frm.trigger("set_full_name");
	},
	apilyedo: function (frm) {
		frm.trigger("set_full_name");
	},

	set_full_name: function (frm) {
		let full_name = "";
		if (frm.doc.pangalan) {
			full_name += frm.doc.pangalan + " ";
		}

		if (frm.doc.pangalang_panggitna) {
			full_name += frm.doc.pangalang_panggitna + " ";
		}

		if (frm.doc.apilyedo) {
			full_name += frm.doc.apilyedo;
		}
		frm.set_value("kompletong_pangalan", full_name.trim());
	},
});
