import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material/';

function Header(props) {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" noWrap>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar> 
        </div>
  )
}

export default Header;