import { Root } from "./Root";
import { makeTestFixture, nextTick, click } from "../test-helpers";
import { mount } from "@odoo/owl";

let fixture;

beforeEach(() => {
	fixture = makeTestFixture();
});

afterEach(() => {
	fixture.remove();
});

describe("Root", () => {
	test("Works as expected...", async () => {
		await mount(Root, fixture);
		expect(fixture.innerHTML).toBe("<div>Hello Owl</div>");

		click(fixture, "div");
		await nextTick();
		expect(fixture.innerHTML).toBe("<div>Hello World</div>");
	});
});