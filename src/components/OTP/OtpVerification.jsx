import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SUBMIT_FORM, VERIFY_OTP } from "../../utils/constants";
import { maskEmail } from "./MaskEmail";
import OtpInputGroup from "./OtpInputGroup";

const OtpVerification = ({ goToNextStep, goToPreviousStep, contactData, handleClose }) => {
    const [otpValue, setOtpValue] = useState("");
    const otpLength = 4;
    const rnCode = import.meta.env.VITE_RNCODE;
    const projectCode = import.meta.env.VITE_PROJECT_CODE;

    const { post: postVerifyOtp, error: otpError, loading: otpLoading } = useFetch(VERIFY_OTP);
    const maskedEmail = maskEmail(contactData?.email);

    const handleModalClose = () => {
        goToPreviousStep();
        handleClose();
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault(); // prevents form reload

        if (otpValue.length !== otpLength) {
            alert("Please enter the complete OTP");
            return;
        }

        try {
            // ✅ STEP 1: Verify OTP
            const otpRes = await postVerifyOtp(`?email=${contactData.email}&otp=${otpValue}&rnCode=${rnCode}`);

            if (otpRes === "OTP verified successfully!" || otpRes?.status === true) {
                // ✅ STEP 2: Submit Form
                const { email, fullName, phone, message } = contactData;

                const queryParams = new URLSearchParams({
                    email,
                    name: fullName,
                    phone,
                    message,
                    rnCode,
                    projectCode,
                });

                try {
                    const response = await fetch(
                        `https://service.infohubinnovations.com/contactus/api/contact/us/submit-form?${queryParams.toString().replace(/%20/g, "+")}`,
                        { method: "POST" }
                    );

                    const data = await response.json();
                    if (response.ok) {
                        console.log("✅ Form submitted successfully", data);
                        goToNextStep();

                    } else {
                        console.error("❌ Server error:", data);
                        goToNextStep();
                    }
                } catch (err) {
                    console.error("❌ Network error:", err.message);
                    goToNextStep();
                }

                goToNextStep(); // show success/failure modal regardless
            }
        } catch (error) {
            console.error("Error during OTP verification:", error);
            goToNextStep();
        }
    };

    return (
        <form onSubmit={handleVerifyOTP}>
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: "1rem"
                }}
            >
                <Typography variant="h6" fontWeight={600} textAlign="center" mb={2}>
                    Verify OTP
                </Typography>

                <Typography
                    sx={{
                        maxWidth: { xs: "95%", sm: "80%", md: "60%", lg: "40%" },
                        textAlign: "center",
                        fontSize: "1rem",
                        fontWeight: "400",
                        color: "gray"
                    }}
                >
                    An authentication code has been sent to your email {maskedEmail}. If you do not receive the message in your inbox, please check your spam or junk box.
                </Typography>

                <OtpInputGroup length={otpLength} onOtpChange={setOtpValue} />

                {otpError?.error && (
                    <Typography variant="body2" color="error">
                        {otpError.error}
                    </Typography>
                )}

                <Button
                    type="submit"
                    disabled={otpLoading}
                    sx={{
                        mt: 2,
                        backgroundColor: "#22C55E",
                        color: "white",
                        padding: "0.5rem 5rem"
                    }}
                >
                    {otpLoading ? "Processing..." : "Verify & Submit"}
                </Button>

                <Button sx={{ color: "#22C55E" }} onClick={handleModalClose}>
                    Close
                </Button>
            </Box>
        </form>
    );
};

export default OtpVerification;
