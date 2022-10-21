import {html, LitElement, property} from 'lit-element';


export class LitTestComponent extends LitElement {

    @property({type: Number})
    initCount = 0;

    render() {
        return html`
            <div>
                <button aria-label="decrement" @click=${() => console.log('click')}>
                -
                </button>
                <span test="counter">${this.initCount}</span>
                <button aria-label="increment" @click=${() => console.log('click')}>
                +
                </button>
            </div>
        `;
    }
}

customElements.define('lit-test-component', LitTestComponent);