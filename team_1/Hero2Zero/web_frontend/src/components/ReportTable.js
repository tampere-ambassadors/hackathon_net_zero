import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';

function ReportTable(props) {
    if (props.type == "overall") {
        return(
            <div>
                <TableContainer component={Paper} sx={{maxWidth: 400, marginTop: 3, marginBottom: 3}}>
                    <Table sx={{ width: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>email</TableCell>
                                <TableCell>GreenRate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.data.map((employee) => (
                            <TableRow
                            key={employee.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{employee.first_name}</TableCell>
                                <TableCell>{employee.last_name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.rating}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    } else if (props.type == "individual") {

    } else {
        return null;
    }
}

export default ReportTable;