import { xml, useState } from "@odoo/owl";
import { OChart } from "@web/components/chart";
import { OPage } from "@web/components/page";

import "./dashboard.xml";

export class Dashboard extends OPage {
	static route = '/';
	static template = 'pages.dashboard';
	static components = {
		OChart,
	};
}
