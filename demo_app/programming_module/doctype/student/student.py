# Copyright (c) 2025, Your Name
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from datetime import date

class Student(Document):
    def autoname(self):
        if self.full_name:
            self.name = self.full_name.strip()
    
    def on_submit(self):
        school_patient_doc = frappe.get_doc({
            "doctype": "School Patient",
            "student": self.name,      
            "gender": self.gender,
            "age": self.age
        })
        school_patient_doc.insert(ignore_permissions=True)
        frappe.msgprint(f"School Patient created for {self.full_name}")
    
    def on_cancel(self):
        frappe.db.sql(
            """
            DELETE FROM `tabSchool Patient`
            WHERE student = %s
            """,
            (self.name,),
        )
        frappe.db.commit()
        frappe.msgprint(f"All School Patient entries for {self.full_name} were deleted.")

def get_students_by_level(level):
    results = frappe.db.sql(
        """
        SELECT full_name
        FROM `tabStudent`
        WHERE level = %s
        """,
        (level,),
        as_dict=True,
    )

    for row in results:
        print(row.full_name)
