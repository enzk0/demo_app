# Copyright (c) 2025, enzk0 and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
    if not filters: filters = {}
    
    columns, data = [], []
    
    columns = get_columns()
    cs_data = get_cs_data(filters)
    
    if not cs_data:
        frappe.msgprint(frappe._('No records found'))
        return columns, cs_data
    
    data = []
    for d in data:
        row = frappe._dict({
			# 'full_name': d.full_name,
			'game': d.game,
			'competition': d.competition
		})
        data.append(row)
    
    return columns, cs_data

def get_cs_data(filters):
    conditions = get_conditions(filters)
    data = frappe.get_all(
		doctype='Game',
		fields=['name', 'competition'],
		filters=conditions,
	)
    return data

def get_conditions(filters):
    conditions = {}
    for key, value in filters.items():
        if filters.get(key):
            conditions[key] = value
    
    return conditions


def get_columns():
    return [
		{
			'fieldname': "full_name",
			'label': frappe._("Full Name"),
			'fieldtype': "Data",
			'width': '120',
		},
		{
			'fieldname': "name",
			'label': frappe._("name"),
			'fieldtype': "Data",
			'width': "120",
		},
		{
			'fieldname': "competition",
			'label': frappe._("Competition"),
			'fieldtype': "Data",
			'width': "120",
		},
	]


