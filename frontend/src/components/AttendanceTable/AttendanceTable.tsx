import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  useAttendance,
  useColumns,
  useMutateAttendance,
  useSchoolboys,
  useLazyLoading,
} from "@/hooks";
import { ABSENT_ICON, LOADED_ROWS, ROWS_QTY } from "@/constans";
import * as S from "./styles";
import { useQueryClient } from "react-query";

export const AttendanceTable = () => {
  const queryClient = useQueryClient();
  const lazy = useLazyLoading();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "0", 10)
  );
  const [limit, setLimit] = useState(
    parseInt(searchParams.get("limit") || "4", 10)
  );
  const { data: schoolboys, isLoading } = useSchoolboys();
  const { data: columns } = useColumns();
  const { data: attendance } = useAttendance();
  const { removeAttendance, addAttendance } = useMutateAttendance();

  const pageOnLimit = page * limit;
  const displayedSchoolboys = schoolboys?.slice(
    pageOnLimit,
    pageOnLimit + limit
  );

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAttendanceChange = (
    schoolboyId: number,
    columnId: number,
    title: string,
    name?: string
  ) => {
    if (title === ABSENT_ICON) {
      removeAttendance.mutate({ SchoolboyId: schoolboyId, ColumnId: columnId });
      queryClient.setQueryData(["message"], `${name} - ПРИСУТНІЙ/НЯ`);
    } else {
      addAttendance.mutate({
        SchoolboyId: schoolboyId,
        ColumnId: columnId,
        Title: ABSENT_ICON,
      });
      queryClient.setQueryData(["message"], `${name} - ВІДСУТНІЙ/НЯ`);
    }
  };

  useEffect(() => {
    setSearchParams({ page: page.toString(), limit: limit.toString() });
  }, [page, limit, setSearchParams]);

  useEffect(() => {
    if (lazy) {
      setLimit((prev) =>
        schoolboys && schoolboys.length <= prev
          ? schoolboys.length
          : prev + LOADED_ROWS
      );
    }
  }, [lazy]);

  if (isLoading) {
    return <CircularProgress thickness={5} sx={S.CircleLoading} />;
  }

  const currentPage = !schoolboys?.length || schoolboys?.length <= 0 ? 0 : page;

  return (
    <>
      <Typography
        align="center"
        fontWeight={600}
        marginBottom="20px"
        variant="h4"
      >
        Сторінка: {page + 1}
      </Typography>
      <TablePagination
        sx={S.Pagination}
        component="div"
        rowsPerPageOptions={ROWS_QTY}
        count={schoolboys?.length || 0}
        rowsPerPage={limit}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <TableContainer component={Paper}>
        <Table sx={S.Table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell>Ім’я учня</TableCell>
              {columns?.map((column) => (
                <TableCell align="center" key={column.Id}>
                  {column.Title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedSchoolboys?.map((schoolboy, index) => {
              const { FirstName, SecondName, LastName, Id } = schoolboy;
              const studentNumber = pageOnLimit + index + 1;
              const studentName = `${FirstName || ""} ${SecondName || ""} ${
                LastName || ""
              }`;
              return (
                <TableRow key={Id}>
                  <TableCell align="center">{studentNumber}</TableCell>
                  <TableCell>
                    <Link to={`/student/${Id}`}>{studentName}</Link>
                  </TableCell>
                  {columns?.map((column) => {
                    const title = attendance?.find(
                      (att) =>
                        att.SchoolboyId === Id && att.ColumnId === column.Id
                    );
                    return (
                      <TableCell
                        key={column.Id}
                        className="custom-table-cell"
                        onClick={() =>
                          handleAttendanceChange(
                            Id,
                            column.Id,
                            title?.Title || "",
                            studentName
                          )
                        }
                        align="center"
                      >
                        {title?.Title || ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={S.Pagination}
        rowsPerPageOptions={ROWS_QTY}
        component="div"
        count={schoolboys?.length || 0}
        rowsPerPage={limit}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};
