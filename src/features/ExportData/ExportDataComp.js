import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import DownloadIcon from '@mui/icons-material/Download';

const ExportDataComp = (props) =>{
    const {exportFileOptions,onClickExport} = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = event=> {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                id="fade-button"
                // aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                endIcon={<DownloadIcon/>}
            >
                Export 
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                {exportFileOptions.map(r=><MenuItem onClick={e=>{
                    handleClose()
                    onClickExport(r)
                }}>{r}</MenuItem>)}
            </Menu>
        </Box>
    )
}

export default ExportDataComp