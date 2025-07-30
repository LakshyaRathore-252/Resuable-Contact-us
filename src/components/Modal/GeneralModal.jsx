import {
    Backdrop,
    Box,
    Modal,
    Slide,
    Typography
} from '@mui/material';
import { useState } from 'react';

const GeneralModal = ({
    open,
    handleClose,
    direction = "down",
    children,
    top = { xs: '5%', md: '8%' },
    
}) => {

    

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Slide in={open} direction={direction} timeout={800}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: top,
                        left: '0%',
                        transform: 'translateX(-50%)',
                        width: "100%",
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        overflowY: 'auto',
                        maxHeight: '90vh',
                        margin: 'auto',
                        minHeight: { xs: '50vh', md: '90vh' },
                        maxHeight: '100vh',

                    }}
                >
                    <Typography onClick={handleClose} sx={{ cursor: 'pointer', maxWidth: '40px', position: 'absolute', top: '20px', right: '30px', fontSize: '30px', display: { xs: 'none', md: 'inline' } }} textAlign="right">
                        ❌
                    </Typography>
                    {children}
                </Box>
            </Slide>
        </Modal>
    );
};

export default GeneralModal;
