import { html, fixture, expect } from '@open-wc/testing';
import "../count-app-sp.js";

describe("CountAppSp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <count-app-sp
        title="title"
      ></count-app-sp>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
