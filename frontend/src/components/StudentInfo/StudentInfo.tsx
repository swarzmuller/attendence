import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useSchoolboys } from "@/hooks";
import { CircleLoading } from "@/components";
import { Schoolboy } from "@/types";
import Pupil from "@/assets/pupil.png";

export const StudentInfo = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = useSchoolboys();

  const userId = +pathname.replace("/student/", "");
  const currentStudent = data?.reduce((acc, current) => {
    if (current.Id === userId) {
      acc = current;
    }
    return acc;
  }, {});

  if (isLoading) {
    return <CircularProgress thickness={5} sx={CircleLoading} />;
  }

  const { FirstName, SecondName, LastName } = currentStudent as Schoolboy;
  const fullName = `${FirstName || ""} ${SecondName || ""} ${LastName || ""}`;
  return (
    <Box>
      <Button variant="contained" color="info" onClick={() => navigate(-1)}>
        Назад
      </Button>
      <Typography
        align="center"
        marginTop="20px"
        marginBottom="10px"
        variant="h3"
        color="textSecondary"
      >
        ПІБ учня:
      </Typography>
      <Typography
        display="flex"
        flexDirection="column"
        alignItems="center"
        align="center"
        gap="16px"
        variant="h4"
      >
        {fullName}
        <img width={300} height={300} src={Pupil} alt={fullName} loading="lazy" />
      </Typography>
    </Box>
  );
};
