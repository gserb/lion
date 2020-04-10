import { LionSelectRich } from './src/LionSelectRich.js';

customElements.define('lion-select-rich', LionSelectRich);


class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <lion-select-rich name="blanao" label="blanao">
        <lion-options slot="input">
          <lion-option .choiceValue=${'vasi'}>vasi</lion-option>
          <lion-option .choiceValue=${'ion'} checked>ion</lion-option>
          <lion-option .choiceValue=${'teal'}>Teal</lion-option>
        </lion-options>
      </lion-select-rich>
    `;
  }

}
customElements.define('my-element', MyElement);
