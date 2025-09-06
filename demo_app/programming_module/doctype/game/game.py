# Copyright (c) 2025, enzk0 and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Game(Document):
	pass

def update_athletes_list(doc, method):
    # Collect athlete names from child table
    participants = [frappe.db.get_value("Athlete", p.athlete, "full_name") 
                    for p in doc.game_participants if p.athlete]
    
    # Join names into a comma-separated string
    doc.athletes_list = ", ".join(participants)
