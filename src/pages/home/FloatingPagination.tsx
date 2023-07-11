import {  Pagination, } from "@mui/material";
import { colors } from "../../global/colors";

const FloatingPagination = ({ onChagePage, maxPages }: any) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "0 auto",
        maxWidth: "400px",
        minWidth: "200px",
        borderRadius: 18,
        background: colors.lightCard,
        display: "flex",
        justifyContent: "center",
        marginBottom: 4,
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Pagination
          count={maxPages}
          size="large"
          onChange={(e, value) => onChagePage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default FloatingPagination;
