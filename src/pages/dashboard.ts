import { xml, useState } from "@odoo/owl";
import { OPage, route, themplate, title } from "../components/page";

import "./dashboard.xml";

@route('/')
@title('Dashboard')
@themplate('pages.dashboard')
export class Dashboard extends OPage {
	static components = {};
}