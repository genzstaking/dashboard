import { Component, xml, useState } from "@odoo/owl";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Footer } from "./Footer";
import {BeginPage } from "./pages/BeginPage";

export class Root extends Component {

	static components = { Sidebar, Topbar, Footer ,BeginPage };
	static template = xml`
    <div id="wrapper">
    	<Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
				<Topbar />
                <BeginPage />
            </div>
            <Footer />
        </div>
    </div>
    `;

	state = useState({ text: "Owl" });

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
