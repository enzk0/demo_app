frappe.ready(function () {
	frappe.web_form.after_load = () => {
		frappe.msgprint("Hello");

		frappe.web_form.on("birthdate", (field, value) => {
			if (value) {
				birthdate = new Date(value);
				var today = new Date();
				var age = Math.floor((today - birthdate) / (365.5 * 24 * 60 * 60 * 1000));
				frappe.web_form.set_value("age", age);
			}
		});
	};
});
