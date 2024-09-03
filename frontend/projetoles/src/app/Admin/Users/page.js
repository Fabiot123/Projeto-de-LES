"use client";

import React from "react";
import UserManagement from "../../../components/UserManagement";
// import users from "@/utils/users";
import { useUserQuery } from "@/services/query/userQuery"; 


export default function Page() {
  return (
    <div>
      <UserManagement />
    </div>
  ); 
}
