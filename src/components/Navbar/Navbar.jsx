import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LOGO_URL, steps } from '../../utils/constants';
import GeneralModal from '../Modal/GeneralModal';
import ContactForm from '../Contact/ContactForm';
import OtpVerification from '../OTP/OtpVerification';
import OtpSuccessMessage from '../OTP/OtpSuccessMessage';
import ToggleIcon from './ToggleIcon';

const Navbar = () => {
    const [activeStep, setActiveStep] = useState(0); // 0 = FORM
    const [openModal, setOpenModal] = useState(false);
    const [contactData, setContactData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    const currentStep = steps[activeStep];



    return (
        <>
            <Box
                component="nav"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: '10px 5px',
                    gap: { xs: '5px', md: '20px' },
                    width: '100%',
                    boxShadow: 3,
                    height: '60px',
                    zIndex: 2000,
                    bgcolor: 'white',
                    position: 'fixed'
                }}
            >
                {/* Logo */}
                <Box sx={{ flexShrink: 0 }}>
                    <img
                        src={LOGO_URL}
                        alt="logo_image"
                        style={{ width: "220px", maxWidth: { xs: "150px", md: "220px" }, height: "auto", maxWidth: "100%", cursor: "pointer" }}
                    />
                </Box>

                {/* Menu Links */}
                <Box
                    component="ul"
                    sx={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        component="a"
                        onClick={() => setOpenModal(true)}
                        sx={{
                            position: 'relative',
                            display: 'inline-block',
                            fontSize: '18px',
                            color: 'black',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: '50%',
                                bottom: "-2px",
                                transform: 'translateX(-50%) scaleX(0)',
                                transformOrigin: 'center',
                                width: '80%',
                                height: '2px',
                                backgroundColor: 'black',
                                transition: 'transform 0.4s ease-in-out',
                            },
                            '&:hover::after': {
                                transform: 'translateX(-50%) scaleX(1)',

                            },
                            '&:hover': {
                                fontSize: '19px',
                                transition: 'transform 0.4s ease-in-out',
                            },
                        }}

                    >
                        Contact Us
                    </Box>

                    {/* Add more nav links here as needed */}
                </Box>

                <ToggleIcon
                    open={openModal}
                    onToggle={() => setOpenModal(prev => !prev)}
                />

            </Box>
            {/* Contact Modal */}
            <GeneralModal
                open={openModal}
                direction="down"
                handleClose={() => {
                    setActiveStep(0);
                    setOpenModal(false)
                }}
            >
                {currentStep === "FORM" && (
                    <ContactForm
                        contactData={contactData}
                        setContactData={setContactData}
                        goToNextStep={() => setActiveStep(1)}
                        handleClose={() => setOpenModal(false)}
                    />
                )}

                {currentStep === "OTP" && (
                    <OtpVerification
                        contactData={contactData}
                        goToNextStep={() => setActiveStep(2)}
                        goToPreviousStep={() => setActiveStep(0)}
                        handleClose={() => setOpenModal(false)}
                    />
                )}

                {currentStep === "SUCCESS" && (
                    <OtpSuccessMessage
                        handleClose={() => {
                            setActiveStep(0);
                            setOpenModal(false);
                        }}
                    />
                )}

            </GeneralModal >

        </>
    );
};


export default Navbar;
