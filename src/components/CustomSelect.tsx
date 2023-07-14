import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { colors } from "../global/colors";

const StyledSelect = styled(Select)`
  & .MuiFilledInput-root {
    border-bottom: 23px solid #edecec !important;
  }
  & .MuiInput-root {
    border-bottom: 23px solid #edecec !important;
  }
  & .MuiSelect-icon {
    color: #edecec !important;
  }
`;

const CustomSelect = ({ label, options, value, onChange, icon }: any) => {
  return (
    <FormControl sx={{ minWidth: 130, m: 1, padding:0 }}>
      <InputLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: colors.defaultGray,
          }}
        >
          {icon}
          <Typography
            sx={{ color: colors.defaultGray, fontSize: 14, marginLeft: 0.4 }}
          >
            {label}
          </Typography>
        </div>
      </InputLabel>
      <StyledSelect
        label={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {icon}
            <Typography>{label}</Typography>
          </div>
        }
        sx={{
          color: colors.white,
          backgroundColor: colors.lightCard,
          borderRadius: 3,
          margin: 0,
        }}
        size="medium"
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
