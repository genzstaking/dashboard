// Global styles
import "./scss/main.scss";

// Global services
import "./core/browser/cookie_service";
import "./core/browser/router_service";
import "./core/browser/title_service";

/**
 * This part starts the webclient. It is in its own file to allow its replacement
 * in enterprise. The enterprise version of the file uses its own webclient import,
 * which is a subclass of the above Webclient.
 */
import { startWebClient } from "./start";
import { WebClient } from "./webclient/webclient";

startWebClient(WebClient);
