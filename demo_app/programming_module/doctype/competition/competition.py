# Copyright (c) 2025, enzk0 and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Competition(Document):
	pass

@frappe.whitelist()
def get_athletes(sport):
    athletes = frappe.get_all(
        "Athlete",
        filters={"sports": sport},
        fields=["name", "first_name", "last_name"]
    )
    return athletes

@frappe.whitelist()
def get_games(competition):
    """Return HTML table of games for the given competition"""

    games = frappe.get_all(
        "Game",
        filters={"competition": competition},
        fields=["name", "score", "start_date_and_time", "end_date_and_time", "duration"]
    )

    html = ""
    html += "<table width='100%' border='1' style='border-collapse: collapse;'>"
    html += "<tr>"
    html += "<th style='background:#ECECEC; padding:8px'>Game</th>"
    html += "<th style='background:#ECECEC; padding:8px'>Score</th>"
    html += "<th style='background:#ECECEC; padding:8px'>Start</th>"
    html += "<th style='background:#ECECEC; padding:8px'>End</th>"
    html += "<th style='background:#ECECEC; padding:8px'>Duration</th>"
    html += "</tr>"

    if games:
        for g in games:
            html += "<tr>"
            html += f"<td style='padding:5px'><a href='#Form/Game/{g.name}'>{g.name}</a></td>"
            html += f"<td style='padding:5px'>{g.score or ''}</td>"
            html += f"<td style='padding:5px'>{g.start_date_and_time or ''}</td>"
            html += f"<td style='padding:5px'>{g.end_date_and_time or ''}</td>"
            html += f"<td style='padding:5px'>{g.duration or ''} mins</td>"
            html += "</tr>"
    else:
        html += "<tr><td colspan='5' style='padding:10px;text-align:center'>No games found</td></tr>"

    html += "</table>"

    return html