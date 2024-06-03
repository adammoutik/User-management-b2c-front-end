import React from "react";
import { Input } from "@material-tailwind/react";

export function InputIcon({ label, icon: Icon, value, onChange }) {
  return (
    <div className="relative">
      <Input
        label={label}
        value={value}
        onChange={onChange}
        icon={<Icon className="h-5 w-5 text-blue-gray-300" />}
      />
    </div>
  );
}
