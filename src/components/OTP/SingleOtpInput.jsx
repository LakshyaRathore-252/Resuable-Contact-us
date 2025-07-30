import { TextField } from "@mui/material";

const SingleOtpInput = ({ value, onChange, onKeyDown, inputRef }) => {
    return (
        <TextField
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            inputRef={inputRef}
            inputProps={{
                maxLength: 1,
                style: {
                    width: "3rem",
                    textAlign: "center",
                    fontSize: "1.5rem",
                },
            }}
        />
    );
};

export default SingleOtpInput;
