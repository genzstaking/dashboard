import {
	Component,
	xml,
	useState,
	onRendered
} from "@odoo/owl";

const TITLE_DEFAULT = "OWL Router";

const ROUTER_TYPES = {
	hash: "hash",
	history: "history"
};

function defer(x) {
	setTimeout(() => x(), 10);
}


/**
Makes the path more secure to use.
 */
function sanitizePath(path) {
	return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

// Simple Vanilla JS Event System
class Emitter {
	constructor(obj) {
		this.obj = obj;
		this.eventTarget = document.createDocumentFragment();
		["addEventListener", "dispatchEvent", "removeEventListener"]
			.forEach(this.delegate, this);
	}

	delegate(method) {
		this.obj[method] = this.eventTarget[method].bind(this.eventTarget);
	}
}

export class Events {

	constructor(host) {
		this.host = host;
		new Emitter(host); // add simple event system
		host.on = (eventName, func) => {
			host.addEventListener(eventName, func);
			return host;
		}
	}

	trigger(event, detail, ev) {
		if (typeof (event) === "object" && event instanceof Event) {
			return this.host.dispatchEvent(event);
		}

		if (!ev) {
			ev = new Event(event, { bubbles: false, cancelable: true });
		}

		ev.detail = { ...(detail || {}), host: this.host };

		return this.host.dispatchEvent(ev);
	}
}


export class Router extends Component {
	static template = xml`<t t-component="currentComponent"/>`;
	static props = ["routes", "type"];
	static defaultProps = {
		type: ROUTER_TYPES.hash
	}

	state = useState({ child: "a" });

	setup() {
		this.events = new Events(this);
		// lesten on route change
		this.listen().on("route", async e => {
			console.log(e.detail.route, e.detail.url);
			this.render();
		});
	}

	get currentComponent() {
		return this._currentRoute.component;
	}

	get routes() {
		return this.props.routes;
	}

	get routerType() {
		return this.props.type | ROUTER_TYPES.hash;
	}

	get isHashRouter() {
		return this.routerType === ROUTER_TYPES.hash;
	}

	/**
	 * Makes the router navigate to the given route
	 * @param {String} path 
	 */
	setRoute(path) {
		if (!this._findRoute(path)) {
			throw TypeError("Route not found");
		}
		let href = this.isHashRouter ? '#' + path : document.location.origin + path;
		history.replaceState(null, null, href);
		this._tryNav(href);
	}

	/**
	 * Start listening for route changes.
	 * @returns {Router} reference to itself.
	 */
	listen() {
		// Check if home page exist
		if (!this._findRoute('/')) {
			throw TypeError("No home route found");
		}

		if (this.isHashRouter) {
			window.addEventListener('hashchange', this._hashChanged.bind(this));
			defer(() => this._tryNav(document.location.hash.substr(1)));
		} else {
			let href = document.location.origin;
			if (this._findRoute(document.location.pathname)) {
				href += document.location.pathname;
			}
			// document.addEventListener("click", this._onNavClick.bind(this));
			window.addEventListener("popstate", this._triggerPopState.bind(this));

			defer(() => this._tryNav(href));
		}
		return this;
	}


	_hashChanged() {
		this._tryNav(document.location.hash.substr(1))
	}

	_triggerPopState(e) {
		let path = e?.state?.path;
		if (!path) {
			// manual path edit
			path = window.location.hash.substr(1);
		}
		this._triggerRouteChange(path, e.target.location.href);
	}

	_triggerRouteChange(path, url) {
		this.events.trigger("route", {
			route: this.routes[path],
			path: path,
			url: url
		})
	}

	_findRoute(url) {
		var test = "/" + url.match(/([A-Za-z_0-9.]*)/gm, (match, token) => { return token })[1];
		return this.routes.hasOwnProperty(test) ? test : null;
	}

	_tryNav(href) {
		const url = this._createUrl(href);
		if (url.protocol.startsWith("http")) {
			const routePath = this._findRoute(url.pathname);
			if (routePath && this.routes[routePath]) {
				if (this.routerType === "history") {
					window.history.pushState({ path: routePath }, routePath, url.origin + url.pathname);
				}
				this._triggerRouteChange(routePath, url);
				return true;
			}
		}
	}

	_createUrl(href) {
		if (this.isHashRouter && href.startsWith("#")) {
			href = href.substr(1);
		}
		return new URL(href, document.location.origin)
	}

	get _currentRoute() {
		// Check if the route type is not hash, then throw error
		let path = window.location.hash || '#/';
		path = path.substr(1);
		// TODO: support path not fount component
		return this.routes[path];
	}

}