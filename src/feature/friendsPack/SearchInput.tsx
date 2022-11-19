import React from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper/Paper'

export const SearchInput = () => {
    return (
        <Paper
            component="form"
            sx={{
                // p: "2px 4px",
                display: 'flex',
                alignItems: 'center',
                width: '1008px',
                margin: '-15px auto',
                // border: "2px solid",
            }}
        >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Provide your text"
                inputProps={{ 'aria-label': 'Provide your text' }}
            />
        </Paper>
    )
}
