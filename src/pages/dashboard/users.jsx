import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Input,
  Button,
  Dialog,
} from "@material-tailwind/react";
import { getUsers, resetPassword, deleteUser, createUser, updateUser } from "@/services/users.service";
import { LockClosedIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, UserPlusIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom"; 
import UserForm from "@/widgets/cards/UserForm";
import { InputIcon } from "@/widgets/inputs/InputIcon";
import { authorsTableData } from "@/data";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [generatedPassword, setGeneratedPassword] = useState(""); // New state for generated password


  const handleClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleOpen = (content = {}) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleCreateUser = async (userData) => {
    try {
      const createdUser = await createUser(userData);
      setGeneratedPassword(createdUser.password);
      fetchUsers(); // Refresh the list of users
      handleOpen({ 
        header: "User Created",
        body: (
          <div>
            <div className="w-72 mb-4">
              User created successfully!
            </div>
            <div className="w-72">
              Generated Password:
              <Input label="Generated Password" value={createdUser.password} disabled />
            </div>
          </div>
        ),
        confirmText: "OK",
        confirmAction: handleClose
      });
    } catch (error) {
      alert("Failed to create user");
    }
  };
  

  const handleUpdateUser = async (userData) => {
    try {
      console.log('Updated user :',userData);
      await updateUser(userData._id, userData);
      fetchUsers(); // Refresh the list of users
    } catch (error) {
      alert("Failed to update user");
    }
  };

  const handleResetPassword = async (email) => {
    try {
      const newPass = await resetPassword(email).then((res) => res.password);
      handleOpen({
        header: "New Password Request",
        body: (
          <div>
            <div className="w-72 mb-4">
              Email:
              <Input label="Email" value={email} disabled />
            </div>
            <div className="w-72">
              Password:
              <Input label="New Password" value={newPass} disabled />
            </div>
          </div>
        ),
        confirmText: "Confirm",
        confirmAction: handleClose,
      });
    } catch (error) {
      alert("Failed to reset password");
    }
  };

  const handleDeleteUser = async (id) => {
    handleOpen({
      header: "Confirm Deletion",
      body: "Are you sure you want to delete this user?",
      confirmText: "Delete",
      confirmAction: async () => {
        try {
          await deleteUser(id);
          setUsers(users.filter((user) => user._id !== id));
          handleClose();
        } catch (error) {
          alert("Failed to delete user");
        }
      },
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            User Table
          </Typography>
        </CardHeader>
        <CardBody className="w-full px-0 pt-0 pb-2">
          <Typography className="flex flex-col gap-10 sm:flex-row justify-between align-middle m-6 p-2" variant="h6" color="white">
              <InputIcon
              className="w-1/2"
                label="Search"
                icon={MagnifyingGlassIcon}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button
  className="flex items-center gap-3"
  size={"sm"}
  onClick={() => {
    setGeneratedPassword(""); // Clear the previous password
    handleOpen({
      header: "Create User",
      body: (
        <UserForm
          handleSubmit={handleCreateUser}
          handleClose={handleClose}
          generatedPassword={generatedPassword} // Pass the generated password state
        />
      ),
    });
  }}
>
  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create User
</Button>

          </Typography>
          <table className="w-full min-w-[640px] table-auto">
            <thead className="text-center">
              <tr>
                {["Full Name", "Email", "Role","Created At", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400 text-center"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(({ _id, firstName, lastName, email,role, createdAt }, key) => {
                const className = `py-3 px-5 ${
                  key === users.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={_id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={'/public/img/admin.jpg'} alt={`img`} size="sm" variant="rounded" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {firstName} {lastName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500 text-center">
                        {email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600 text-center">
                       
                      {role}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600 text-center">
                       
                      {createdAt}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex w-full gap-4 justify-center align-center">
                        
                          <LockClosedIcon width={'25px'} onClick={() => handleResetPassword(email)} />
       
                          <TrashIcon width={'25px'} onClick={() => handleDeleteUser(_id)} />
                        <PencilIcon width={'25px'} onClick={() => {
                          setSelectedUser({ _id, firstName, lastName, email }); 
                          handleOpen({ header: "Update User", body: <UserForm handleSubmit={handleUpdateUser} handleClose={handleClose} user={{ _id, firstName, lastName, email }} /> });
                        }}/>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Dialog open={dialogOpen} handler={handleClose}>
        <div className="p-4 space-y-4">
          <div className="dialog-header">
            <Typography variant="h6">{dialogContent.header}</Typography>
          </div>
          <div className="dialog-body">
            {dialogContent.body}
          </div>
          {dialogContent.confirmText && (
            <div className="dialog-footer">
              <Button variant="text" color="red" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={dialogContent.confirmAction}
              >
                {dialogContent.confirmText}
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
