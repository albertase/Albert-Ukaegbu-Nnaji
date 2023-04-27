import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { IUser, UserContext, UserContextType } from "../../context/context";
import Cards from "./UserCards";
import Pagination from "./Pagination";
import "./Users.scss";
import UsersTable from "./UsersTable";

type FilterValues = {
  org: string;
  username: string;
  email: string;
  date: string;
  status: string;
};

const Users: React.FC = () => {
  const { loading, users, usersOverview } = useContext(UserContext) as UserContextType;
  const [filterUsers, setFilterUsers] = useState<IUser[]>(users);
  const [postPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilterUsers(users);
  }, [users]);

  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentTemplate = useMemo(() => filterUsers.slice(indexOfFirstPage, indexOfLastPage), [filterUsers, indexOfFirstPage, indexOfLastPage]);
  const numberOfPages = useMemo(() => Math.ceil(filterUsers.length / postPerPage), [filterUsers, postPerPage]);

  const filterSearch = useCallback((val: FilterValues) => {
    const filtered: IUser[] = users.filter((user) => {
      const formattedDate = new Date(user.createdAt).toISOString().split("T")[0];
      return (
        user.status.toLowerCase().includes(val.status.toLowerCase()) &&
        user.orgName.toLowerCase().includes(val.org.toLowerCase()) &&
        user.userName.toLowerCase().includes(val.username.toLowerCase()) &&
        user.email.toLowerCase().includes(val.email.toLowerCase()) &&
        formattedDate === val.date
      );
    });
    setFilterUsers(filtered);
  }, [users]);

  const handleFilter = useCallback((val: any) => {
    filterSearch(val);
  }, [filterSearch]);

  const handleReset = useCallback(() => {
    setFilterUsers(users);
  }, [users]);

  return (
    <div className="users">
      <h3>Users</h3>
      <Cards usersOverview={usersOverview} loading={loading} />
      <UsersTable
        filterUsers={currentTemplate}
        users={users}
        loading={loading}
        handleReset={handleReset}
        handleFilter={handleFilter}
      />
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        next={() => setCurrentPage(currentPage + 1)}
        previous={() => setCurrentPage(currentPage - 1)}
        setPage={(val: number) => setCurrentPage(val)}
      />
    </div>
  );
};

export default Users;