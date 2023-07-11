import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)`
  & input {
    border-color: white;
    &::placeholder {
      color: white;
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #27b4a4 !important;
  }
  & .MuiFilledInput-root {
    border-bottom: 1px solid #b8bbbf !important;
  }
  & .MuiInput-root {
    border-bottom: 1px solid #b8bbbf !important;
  }
  & .MuiInputBase-root {
    color: white;
  }
`;

const CustomTextField = ({
  onChange,
  error,
  label,
}: {
  onChange: (e: any) => void;
  error: string;
  label: string;
}) => (
  <StyledTextField
    margin="normal"
    onChange={onChange}
    required
    fullWidth
    label={label}
    error={!!error}
    helperText={error}
    InputLabelProps={{
      style: { color: "#fff" },
    }}
  />
);

export default CustomTextField;
