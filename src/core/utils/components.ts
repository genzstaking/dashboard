/** @odoo-module **/

import { Component, onError, xml, useSubEnv } from "@odoo/owl";

export class ErrorHandler extends Component {
    static template = xml`<t t-slot="default" />`;
    static props = ["onError"];
    public setup(): void {
        onError((error) => {
            this.props.onError(error);
        });
    }
}



export class WithEnv extends Component {
    static template = xml`<t t-slot="default"/>`;
    public setup(): void {
        useSubEnv(this.props.env);
    }
}

