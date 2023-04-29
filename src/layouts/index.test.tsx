import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from './index';

describe('Layout component', () => {
  test('renders header and children', () => {
    render(
      <Layout>
        <div>Child content</div>
      </Layout>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
    const childElement = screen.getByText('Child content');
    expect(childElement).toBeInTheDocument();
  });

  test('opens and closes side nav', () => {
    render(
      <Layout>
        <div>Child content</div>
      </Layout>
    );
    const openSideNavBtn = screen.getByTestId('open-side-nav-btn');
    fireEvent.click(openSideNavBtn);
    const sideNavElement = screen.getByTestId('side-nav');
    expect(sideNavElement).toHaveClass('openSideNav');
    fireEvent.click(openSideNavBtn);
    expect(sideNavElement).not.toHaveClass('openSideNav');
  });
});