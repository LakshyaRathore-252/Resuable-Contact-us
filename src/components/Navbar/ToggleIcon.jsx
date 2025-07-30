import { Typography } from "@mui/material";

const ToggleIcon = ({ open, onToggle }) => {
    return (
        <Typography
            onClick={onToggle}
            sx={{
                cursor: 'pointer',
                display: { xs: 'inline-flex', md: 'none' },
                fontSize: open ? '30px' : '40px',
                maxWidth: '40px',
            }}

        >
            {open ? "❌" : "☰"}
        </Typography>
    );
};

export default ToggleIcon;
