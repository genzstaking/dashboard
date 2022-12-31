import { Component, useState } from "@odoo/owl";


/**
 * Abstract Page 
 * 
 * All pages must inherid directly from this component.
 */
export class OPage extends Component {

    pageInfo = useState({
        title: ""
    });

    /**
     * Replace title of the page.
     * 
     * @param title of the current page
     * @returns the current page
     */
    public setTitle(title: string): OPage {
        this.pageInfo.title = title;
        // TODO: update title of the current page
        return this;
    }
}
