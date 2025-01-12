import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export const CircleLoading = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Table = (theme: Theme) => css`
  thead {
    background-color: ${theme.palette.grey[300]};
  }

  .MuiTableCell-root {
    font-size: 24px;
    border: 1px solid ${theme.palette.grey[300]};
  }

  .custom-table-cell {
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: ${theme.palette.grey[100]};
    }
  }
`;

export const Pagination = css`
  font-size: 18px;
  .MuiTablePagination-selectLabel,
  .MuiTablePagination-displayedRows {
    font-size: 18px;
  }
`;
