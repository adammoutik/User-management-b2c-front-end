import React, { useState, useEffect } from "react";
import { Input, Button, Switch } from "@material-tailwind/react";

export default function UserForm({ handleSubmit, handleClose, user, generatedPassword }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isActive: false,
    role: "Guest",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  useEffect(() => {
    if (generatedPassword) {
      setFormData((prevData) => ({
        ...prevData,
        password: generatedPassword,
      }));
    }
  }, [generatedPassword]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Input
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Input
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Active</span>
        <Switch
          checked={formData.isActive}
          name="isActive"
          color="green"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Roles
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="Admin">Admin</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Guest">Guest</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="text" color="red" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient" color="green">
          {user ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}
