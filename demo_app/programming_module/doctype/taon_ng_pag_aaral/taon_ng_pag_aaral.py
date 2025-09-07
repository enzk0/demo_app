# Copyright (c) 2025, enzk0 and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class TaonngPagaaral(Document):
	def autoname(self):
		if self.taon_ng_pag_aaral:
			self.name = self.taon_ng_pag_aaral
