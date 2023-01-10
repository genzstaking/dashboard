import { Component, useState } from "@odoo/owl";
import { registry } from "../core/registry";

export const route = (path: string) => {
    return (target: any) => {
        target.route = path;
        registry.category('pages').add(path, target);
    }
}
export const themplate = (name: string) => {
    return (target: any) => {
        target.template = name;
    }
}
export const logo = (path: string) => {
    return (target: any) => {
        target.logo = path;
    }
}
export const title = (title: string) => {
    return (target: any) => {
        target.title = title;
    }
}
export const symbol = (name: string) => {
    return (target: any) => {
        target.symbol = name;
    }
}


/**
 * Abstract Page 
 * 
 * All pages must inherid directly from this component.
 */
export abstract class OPage extends Component {

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


export function usePage(path: string, page: any) {
    // TODO;;
    registry.category('pages').add(path, page);
}