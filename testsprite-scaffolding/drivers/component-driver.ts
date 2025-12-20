/**
 * Component Test Driver
 * 
 * PURPOSE: A driver is the code that calls the Module Under Test (MUT),
 * passing in test data and initiating the execution. This driver provides
 * a structured way to render and interact with React components for testing.
 * 
 * ROLE IN SCAFFOLDING: The driver acts as the "caller" that provides inputs
 * to the component being tested and orchestrates the test execution flow.
 */

import { render, screen, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

/**
 * Base configuration for component drivers
 */
interface ComponentDriverConfig<TProps> {
  /** The component to test */
  component: (props: TProps) => ReactElement;
  /** Default props to use if not overridden */
  defaultProps: TProps;
}

/**
 * Result object returned by the driver after rendering
 */
interface DriverResult {
  /** The render result from testing-library */
  renderResult: RenderResult;
  /** Helper to get element by test ID */
  getByTestId: (id: string) => HTMLElement;
  /** Helper to query element by test ID (returns null if not found) */
  queryByTestId: (id: string) => HTMLElement | null;
  /** Helper to find element by text */
  getByText: (text: string | RegExp) => HTMLElement;
  /** Helper to click an element */
  click: (element: HTMLElement) => void;
  /** Helper to type into an input */
  type: (element: HTMLElement, value: string) => void;
  /** Helper to wait for async operations */
  waitForElement: (callback: () => HTMLElement) => Promise<HTMLElement>;
}

/**
 * Creates a component test driver
 * 
 * @example
 * ```typescript
 * const driver = createComponentDriver({
 *   component: AddPlantModal,
 *   defaultProps: { onAdd: vi.fn(), onClose: vi.fn() }
 * });
 * 
 * const { getByText, click } = driver.render();
 * click(getByText('Add Plant'));
 * ```
 */
export function createComponentDriver<TProps>(
  config: ComponentDriverConfig<TProps>
) {
  const { component: Component, defaultProps } = config;

  return {
    /**
     * Renders the component with optional prop overrides
     * @param propsOverride - Partial props to override defaults
     */
    render(propsOverride: Partial<TProps> = {}): DriverResult {
      const mergedProps = { ...defaultProps, ...propsOverride } as TProps;
      const renderResult = render(<Component {...mergedProps} />);

      return {
        renderResult,
        getByTestId: (id: string) => screen.getByTestId(id),
        queryByTestId: (id: string) => screen.queryByTestId(id),
        getByText: (text: string | RegExp) => screen.getByText(text),
        click: (element: HTMLElement) => fireEvent.click(element),
        type: (element: HTMLElement, value: string) => {
          fireEvent.change(element, { target: { value } });
        },
        waitForElement: (callback: () => HTMLElement) => waitFor(callback),
      };
    },

    /**
     * Gets the default props for reference
     */
    getDefaultProps(): TProps {
      return { ...defaultProps };
    },
  };
}

/**
 * Example usage with AddPlantModal component:
 * 
 * ```typescript
 * import AddPlantModal from '@/components/add-plant-modal';
 * import { vi } from 'vitest';
 * 
 * const modalDriver = createComponentDriver({
 *   component: AddPlantModal,
 *   defaultProps: {
 *     onAdd: vi.fn(),
 *     onClose: vi.fn(),
 *   }
 * });
 * 
 * // In test:
 * const { getByText, click, type } = modalDriver.render();
 * type(screen.getByPlaceholderText('e.g., My Monstera'), 'Rose');
 * click(getByText('Add Plant'));
 * ```
 */
