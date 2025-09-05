// Copyright (c) 2025, enzk0 and contributors
// For license information, please see license.txt

frappe.ui.form.on("Competition", {
	refresh: function (frm) {
		frm.add_custom_button("Get Athletes", function () {
			if (!frm.doc.sport) {
				frappe.msgprint("Please select a Sport first.");
				return;
			}

			frappe.call({
				method: "demo_app.programming_module.doctype.competition.competition.get_athletes",
				args: {
					sport: frm.doc.sport,
				},
				callback: function (r) {
					if (r.message) {
						frappe.msgprint("Fetched " + r.message.length + " athletes.");
						console.log(r.message);

						// Optional: clear and populate Participants table
						frm.clear_table("participants");
						r.message.forEach((row) => {
							let child = frm.add_child("participants");
							child.athlete = row.name;
							child.team = "Team A"; // default, can be changed manually
							console.log("Row: ", row);
							console.log("Row.name", row.first_name);
							console.log("Team: ", child.team);
						});
						frm.refresh_field("participants");
					}
				},
			});
		});

		frm.add_custom_button("Make Game", function () {
			frappe.model.with_doctype("Game", function () {
				let new_doc = frappe.model.get_new_doc("Game");
				new_doc.competition = frm.doc.name; // Link back to Competition

				frappe.set_route("Form", "Game", new_doc.name);

				// After saving Game → redirect back to Competition
				frappe.ui.form.on("Game", {
					after_save: function (game_frm) {
						frappe.set_route("Form", "Competition", frm.doc.name);
						frm.reload_doc();
					},
				});
			});
		});
		frm.trigger("render_games");
	},

	render_games: function (frm) {
		if (!frm.doc.name) return;
		frappe.call({
			method: "demo_app.programming_module.doctype.competition.competition.get_games",
			args: { competition: frm.doc.name },
			callback: function (r) {
				if (r.message) {
					frm.fields_dict["game"].$wrapper.html(r.message);
				} else {
					frm.fields_dict["game"].$wrapper.html("<p>No games found.</p>");
				}
			},
		});
	},
});
