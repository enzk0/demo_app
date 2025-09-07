# Copyright (c) 2025, enzk0 and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SampleCollege(Document):
	def autoname(self):
		if self.kompletong_pangalan:
			self.name = self.kompletong_pangalan
