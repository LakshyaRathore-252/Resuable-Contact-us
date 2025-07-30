import { Box, Button, Typography } from '@mui/material';

const OtpSuccessMessage = ({ handleClose  }) => {
  

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
                boxShadow: 3,
                maxWidth: 800,
                mx: 'auto',
                px: { xs: 2, sm: 2, md: 5, lg: 5 },
                py: 4,
                rowGap: 1.5,
                borderRadius: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="h3">🎉</Typography>

            <Typography variant="h5" fontWeight="bold">
                Thank You!
            </Typography>

            <Typography variant="body1">
                We have received your message successfully.
            </Typography>

            <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
                Close
            </Button>
        </Box>
    );
};

export default OtpSuccessMessage;
