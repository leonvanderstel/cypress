import {mount} from "../mount";
import {LitTestComponent} from "./LitTestComponent";

/// <reference types="cypress" />
// @ts-check
describe('<LitTestComponent>', function () {
    it('should render', () => {
        mount(LitTestComponent)

        cy.get('lit-test-component')
            .shadow()
            .find('[test=counter]').should('have.text', 0)
    })
});