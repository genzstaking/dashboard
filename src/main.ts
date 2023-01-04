
// Import services
import "@web/core/assets";
import "@web/webclient/menus/menu_service";
import "@web/webclient/actions/action_service";

import { startWebClient } from "./start";
import { WebClient } from "./webclient/webclient";

import "@web/scss/main.scss";
/**
 * This file starts the webclient. It is in its own file to allow its replacement
 * in enterprise. The enterprise version of the file uses its own webclient import,
 * which is a subclass of the above Webclient.
 */
startWebClient(WebClient);
