import { mount } from "@odoo/owl";
import { Root } from "@web/app";
import { registry } from "@web/core/registry";

import "./scss/main.scss";


/**
 * Registry and Categories
 * 
 * A useful feature of registries is that they maintain a set of sub registries, 
 * obtained by the category method. If the sub registry does not exist yet, it 
 * is created on the fly. All registries used by the web client are obtained in 
 * such a way from one root registry, exported in @web/core/registry.
 * 
 * - wallets: list of wallets to be used in staking and etc.
 * - services: all services that should be activated
 * 
 * These are in our planning
 * - effects: implementation for all available effects
 * - formatters: utility functions to format values (mostly used for field values)
 * - main_components: top level components
 * - parsers: utility functions to parse values (mostly used for field values)
 * - systray: components displayed in the systray zone in the navbar
 * - user_menuitems: menu items displayed in the user menu (top right of navbar)
 */

registry.category('wallets')
    // CSC networks
    .add('csc-mainnet', '0xEAfF084e6da9aFE8EcAB4d85de940e7d3153296F')
    .add('csc-testnet', '0x42eAcf5b37540920914589a6B1b5e45d82D0C1ca');

mount(Root, document.body);
