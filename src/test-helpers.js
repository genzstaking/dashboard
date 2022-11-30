import { Component } from "@odoo/owl";
import "regenerator-runtime/runtime";

export async function nextTick() {
	await new Promise((resolve) => setTimeout(resolve));
	await new Promise((resolve) => requestAnimationFrame(resolve));
}

export function makeTestFixture() {
	let fixture = document.createElement("div");
	document.body.appendChild(fixture);
	return fixture;
}

export function click(elem, selector) {
	elem.querySelector(selector).dispatchEvent(new Event("click"));
}