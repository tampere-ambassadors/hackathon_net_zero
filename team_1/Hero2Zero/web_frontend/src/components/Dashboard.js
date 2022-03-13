import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ReportTable from './ReportTable';
import {Grid, Button, TextField, MenuItem} from '@mui/material';

function Dashboard(props) {
    let navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [employeeIds, setEmployeeIds] = useState([]);
    const [result, setResult] = useState({rating: {}, type: ""});
    const [choice, setChoice] = useState(0);

    useEffect(() => {
        if (!props.email || !props.pass || !props.id)
            navigate("/");
        
        fetch(`https://21wsp4pw.course.tamk.cloud/api/v2/report/${props.email}/super_secret_pass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: props.id, pass: props.pass})
        })
        .then(response => response.json())
        .then(data => {
            if (data.length != 0) {
                let names = [];
                let ids = [];
                let list = [];
                for (let i in data) {
                    names.push(i.first_name + " " + i.last_name);
                    ids.push(i.id);
                    list.push({id: i.id, name: i.first_name + " " + i.last_name});
                }
                setEmployees(list);
                setEmployeeIds(ids);
                setResult({rating: data, type: "overall"});
            }
        })
        .catch(err => console.error(err))
    }, []);

    const getIndividualReport = () => {

        fetch(`https://21wsp4pw.course.tamk.cloud/api/v2/report/${choice}/super_secret_pass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: props.id, pass: props.pass})
        })
        .then(response => response.json())
        .then(data => {
            setResult({rating: data, type: "individual"});
        })
        .catch(err => console.error(err))
    }

    const getReport = () => {
        fetch(`https://21wsp4pw.course.tamk.cloud/api/v2/report/super_secret_pass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: props.id, pass: props.pass})
        })
        .then(response => response.json())
        .then(data => {
            if (data.length != 0) {
                let names = [];
                let ids =[];
                for (let i in data) {
                    names.push(i.first_name + " " + i.last_name);
                    ids.push(i.id);
                }
                setEmployees(names);
                setEmployeeIds(ids);
                setResult({rating: data, type: result.type});
            }
        })
        .catch(err => console.error(err))
    }

    return(
        <div>
            <Header title="Dashboard"/>
            <Grid container justifyContent="center">
                <Button 
                    variant='contained' 
                    onClick={getReport}
                    sx={{margin: 1}}
                    size='large'
                >
                    Get overall report
                </Button>
                <Button 
                    variant='contained' 
                    onClick={getIndividualReport}
                    sx={{margin: 1}}
                    size='large'
                >
                    Get individual report
                </Button>
                <TextField 
                    label="Employee" 
                    select
                    name="employee"
                    sx={{margin: 1}}
                    onChange={event => setChoice(event.target.value)}
                >
                    {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                        {employee.name}
                        </MenuItem>
                    ))}
                </TextField>
                <ReportTable type={result.type} data={result.rating}></ReportTable>
            </Grid>
        </div>
  )
}

export default Dashboard;