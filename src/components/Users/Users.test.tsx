import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { UserContext } from '../../context/context';
import Users from './Users';

const mockUserContext = {
  loading: false,
  users: [
    {
      id: 1,
      orgName: 'Org1',
      userName: 'User1',
      email: 'user1@example.com',
      createdAt: '2022-04-01T10:00:00.000Z',
      status: 'Active',
    },
    {
      id: 2,
      orgName: 'Org2',
      userName: 'User2',
      email: 'user2@example.com',
      createdAt: '2022-04-02T10:00:00.000Z',
      status: 'Inactive',
    },
  ],
  usersOverview: {
    total: 2,
    active: 1,
    inactive: 1,
  },
};

describe('Users component', () => {
  it('renders Users component with correct data', () => {
    render(
      <UserContext.Provider value={null}>
        <Users />
      </UserContext.Provider>
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Org1')).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Org2')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
    expect(screen.getByText('Active: 1')).toBeInTheDocument();
    expect(screen.getByText('Inactive: 1')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('filters users correctly', () => {
    render(
      <UserContext.Provider value={null}>
        <Users />
      </UserContext.Provider>
    );

    const filterOrgInput = screen.getByPlaceholderText('Org');
    fireEvent.change(filterOrgInput, { target: { value: 'Org1' } });

    expect(screen.getByText('Org1')).toBeInTheDocument();
    expect(screen.queryByText('Org2')).not.toBeInTheDocument();
  });

  it('resets filters correctly', () => {
    render(
      <UserContext.Provider value={null}>
        <Users />
      </UserContext.Provider>
    );

    const filterOrgInput = screen.getByPlaceholderText('Org');
    fireEvent.change(filterOrgInput, { target: { value: 'Org1' } });

    expect(screen.getByText('Org1')).toBeInTheDocument();
    expect(screen.queryByText('Org2')).not.toBeInTheDocument();

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(screen.getByText('Org1')).toBeInTheDocument();
    expect(screen.getByText('Org2')).toBeInTheDocument();
  });

  it('changes pagination page correctly', () => {
    render(
      <UserContext.Provider value={null}>
        <Users />
      </UserContext.Provider>
    );

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    expect(screen.queryByText('Org1')).not.toBeInTheDocument();
    expect(screen.getByText('Org2')).toBeInTheDocument();
  });
});