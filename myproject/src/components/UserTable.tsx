import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
