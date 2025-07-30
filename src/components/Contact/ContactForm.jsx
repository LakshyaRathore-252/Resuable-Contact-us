import { Box, Button, TextareaAutosize, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { schema } from '../../utils/schema';
import { GENERATE_OTP } from '../../utils/constants';
import useFetch from '../../hooks/useFetch';

const ContactForm = ({ handleClose, contactData, setContactData, goToNextStep }) => {
    const { post, loading } = useFetch(GENERATE_OTP);
    const rnCode = import.meta.env.VITE_RNCODE;
    const projectCode = import.meta.env.VITE_PROJECT_CODE;

    const formik = useFormik({
        initialValues: contactData,
        validationSchema: schema,
        onSubmit: async (values) => {
            const { fullName, email, phone, message } = values;
            try {
                const res = await post(`?email=${email}&rnCode=${rnCode}&projectCode=${projectCode}`);
                if (res === `OTP sent to ${email}`) {
                    alert("OTP Sent Successfully!");
                    goToNextStep();
                    setContactData({ fullName, email, phone, message });
                } else {
                    throw new Error("Unexpected response from server");
                }
            } catch (error) {
                console.error("Error during submission:", error);
                alert("Error during submission. Please try again.");
            }
        }
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'start',
                justifyContent: 'center',
                margin: 'auto',
                maxWidth: { sm: "80%", lg: "100%" },
                marginBottom: 4,
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "semiBold", textAlign: { sm: "start", md: "center" } }}>
                Leave us a message or send an email to
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "600" }} textAlign="start">
                <a href="mailto:support@teachwings.com" style={{ textDecoration: "none" }}>
                    support@teachwings.com
                </a>
            </Typography>

            <form
                onSubmit={formik.handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: "20px",
                    marginTop: 20,
                    maxWidth: '100%',
                    width: '100%',
                }}
            >
                {/* Name */}
                <Box sx={{ width: '100%' }}>
                    <label>Full Name</label>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onKeyDown={(e) => {
                            if (e.key >= '0' && e.key <= '9') e.preventDefault();
                        }}
                        sx={{ mt: 1, '& .MuiInputBase-root': { height: 40 } }}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <Typography color="error" variant="caption">{formik.errors.fullName}</Typography>
                    )}
                </Box>

                {/* Email and Phone */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        <label>Email Address</label>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            sx={{ mt: 1, '& .MuiInputBase-root': { height: 40 } }}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <Typography color="error" variant="caption">{formik.errors.email}</Typography>
                        )}
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <label>Contact Number</label>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onKeyDown={(e) => {
                                const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
                                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            sx={{ mt: 1, '& .MuiInputBase-root': { height: 40 } }}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <Typography color="error" variant="caption">{formik.errors.phone}</Typography>
                        )}
                    </Box>
                </Box>

                {/* Message */}
                <Box sx={{ width: '100%' }}>
                    <label>Your Message</label>
                    <TextareaAutosize
                        name="message"
                        minRows={4}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            resize: 'vertical',
                            marginTop: '10px'
                        }}
                    />
                    {formik.touched.message && formik.errors.message && (
                        <Typography color="error" variant="caption">{formik.errors.message}</Typography>
                    )}
                </Box>

                {/* Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: { md: 1, lg: 2 },
                        width: "100%"
                    }}
                >
                    <Button onClick={handleClose} color="error" variant="outlined" sx={{ width: "48%" }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" sx={{ width: "48%" }}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ContactForm;
