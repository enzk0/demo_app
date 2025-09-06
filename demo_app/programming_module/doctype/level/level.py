# Copyright (c) 2025, enzk0 and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Level(Document):
	def autoname(self):
		self.name = self.level.strip()
