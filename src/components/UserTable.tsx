import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User } from "../Models/User.ts";
import RepoProvider from "../lib/repositories/RepoProvider.ts";
import { TextField } from "@mui/material";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const fetchedUsers = await RepoProvider.getUserRepo().getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const searchUsers = async (text: string) => {
    console.log(text);

    let data = await RepoProvider.getUserRepo().searchUsers(text);
    setUsers(data)
  }



  return (
    <div>
      <TextField onKeyPress={(e) => {
        if (e.target.value.length === 0) {
          fetchData()
        } else if (e.target.value.length > 2) {
          searchUsers(e.target.value)
        }

      }} className="my-3" id="outlined-basic" label="Search" variant="outlined" />

      {users.length === 0 ? (

        <h6 className="my-3 text-center">No User Found !</h6>
      ) :
        (<TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="fw-bold text-capitalize" >Id</TableCell>
                <TableCell className="fw-bold text-capitalize" >First Name</TableCell>
                <TableCell className="fw-bold text-capitalize" >Last Name</TableCell>
                <TableCell className="fw-bold text-capitalize" >Email</TableCell>
                <TableCell className="fw-bold text-capitalize" >Gender</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>


              {users.map((user, index) => (

                <TableRow key={index}>
                  {/* Render user data */}
                  <TableCell key={user.id}>{user.id}</TableCell>
                  <TableCell key={user.first_name}>{user.first_name}</TableCell>
                  <TableCell key={user.last_name}>{user.last_name}</TableCell>
                  <TableCell key={user.email}>{user.email}</TableCell>
                  <TableCell key={user.gender}>{user.gender}</TableCell>

                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>)}
    </div>
  );
};

export default UserTable;
