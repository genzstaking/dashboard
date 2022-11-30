import { Component, xml, useState } from "@odoo/owl";

export class Footer extends Component {

	static template = xml`
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright  Your Website 2021</span>
            </div>
        </div>
    </footer>
    `;

	state = useState({ text: "Owl" });

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
