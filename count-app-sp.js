/**
 * Copyright 2026 jordanfrisco
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `count-app-sp`
 * 
 * @demo index.html
 * @element count-app-sp
 */
export class CountAppSp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "count-app-sp";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/count-app-sp.ar.json", import.meta.url).href +
        "/../",
    });
    this.count = 0
    this.min = 5;
    this.max = 25;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number, reflect: true },
      // have to establish the max and min as variables first 
      min: {final: true, type: Number, reflect: true},
      max: {final: true, type: Number, reflect: true},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      // change the colors when reaches 18 + 21
      :host([count = "18"]) h3 {
        color: var(--ddd-theme-default-keystoneYellow);
      }
      :host([count = "21"]) h3 {
       color: var(--ddd-theme-default-wonderPurple);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--count-app-sp-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML + set the buttons for counting + disable the button when min or max is reached 
  render() {
    return html`
<div class="wrapper">

  <confetti-container id= "confetti">
  <h3>${this.count}</h3>
    <button @click="${this.decrement}"
    ?disabled="${this.min === this.count}">-</button>
  <button @click="${this.increment}"
  ?disabled="${this.max === this.count}">+</button>
  <slot></slot>
  </confetti-container>
</div>`;
/** these commands are to implement the max and min in order for the counter to stop incrementing or decrementing */
  }
  increment() {
    if(this.count == this.max){
      return;
    }
    this.count++;
  }
  decrement () {
    if(this.count == this.min)
    {
      return;
    }
    this.count--;
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

updated(changedProperties) {
  if (super.updated) {
    super.updated(changedProperties);
  }
  if (changedProperties.has('count')) {
    if (this.count === 21) {
      this.makeItRain();
    }
  }
}

makeItRain() {

  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
     
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

}

globalThis.customElements.define(CountAppSp.tag, CountAppSp);