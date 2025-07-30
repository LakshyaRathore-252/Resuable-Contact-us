import { Box } from "@mui/material";
import { useRef, useState } from "react";
import SingleOtpInput from "./SingleOtpInput";

const OtpInputGroup = ({ length = 4, onOtpChange }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, idx) => {
        const val = e.target.value;
        if (!/^\d?$/.test(val)) return; // Allow only digits or empty

        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);
        onOtpChange?.(newOtp.join(""));

        if (val && idx < length - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    return (
        <Box display="flex" gap={1}>
            {otp.map((digit, idx) => (
                <SingleOtpInput
                    key={idx}
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    inputRef={(el) => (inputRefs.current[idx] = el)}
                />
            ))}
        </Box>
    );
};

export default OtpInputGroup;
