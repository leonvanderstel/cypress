import {
  getContainerEl,
} from '@cypress/mount-utils'

/**
 * Mounts a LitElement component inside the Cypress browser
 *
 * @param {LitElementConstructor} Component LitElement component being mounted
 * @returns Cypress.Chainable<MountReturn>
 *
 * @example
 * import Counter from './Counter.ts'
 * import { mount } from 'cypress/lit-element'
 *
 * it('should render', () => {
 *   mount(Counter, { props: { count: 42 } })
 *   cy.get('button').contains(42)
 * })
 */

function randomID (len: number) {
  var arr = new Uint8Array(len / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, (d) => d.toString(16).padStart(2, "0")).join('')
}

type Constructor<T> = new (...args: any[]) => T;
export function mount<T extends Constructor<HTMLElement>>(
    component: T,
    properties?: Partial<InstanceType<T>>,
) {
  let instance: InstanceType<T>;
  try {
    // Creating an unregistered element will throw, so first we try to create an instance as is
    // but if that fails we have to register the component first.
    instance = Object.assign(new component() as InstanceType<T>, properties ?? {});

    console.log(instance);
  } catch (_) {
    // Register unregistered element
    customElements.define(`test-mount-${randomID(10)}`, component);
    // Retry
    instance = Object.assign(new component() as InstanceType<T>, properties ?? {});
  }

  const root = getContainerEl()
  if(!root) {
    throw new Error('No cypress root element found')
  }

  root.append(instance)

  return cy.wait(0, { log: false }).then(() => {}).wrap({ component: instance }, { log: false })
}