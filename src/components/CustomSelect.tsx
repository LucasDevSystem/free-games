import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import { colors } from "../global/colors";

const StyledSelect = styled(Select)`
  & .MuiOutlinedInput-notchedOutline {
    border-color: #edecec !important;
  }
  & .MuiFilledInput-root {
    border-bottom: 2px solid #edecec !important;
  }
  & .MuiInput-root {
    border-bottom: 2px solid #edecec !important;
  }
  & .MuiSelect-icon {
    color: #edecec !important;
  }
`;

const CustomSelect = ({ label, options, value, onChange }: any) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel style={{ color: colors.white }}>{label}</InputLabel>
      <StyledSelect
        value={value}
        label={label}
        sx={{
          color: colors.white,
          minWidth: 120,
        }}
        onChange={onChange}
      >
        {options.map((option: string) => (
          <MenuItem key={option + label} value={option}>
            {option}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default CustomSelect;
