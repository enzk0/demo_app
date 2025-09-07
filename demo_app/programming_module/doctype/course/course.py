# Copyright (c) 2025, enzk0 and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Course(Document):
	def autoname(self):
		if self.course:
			self.name = self.course
