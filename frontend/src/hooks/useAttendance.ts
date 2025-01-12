import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAttendance, postRate, postUnRate } from "@/api";
import { Attendance } from "@/types";

export const useAttendance = (schoolboyId?: number) =>
  useQuery(["attendance", schoolboyId], () => getAttendance(schoolboyId));

export const useMutateAttendance = () => {
  const queryClient = useQueryClient();

  const updateCache = (attendance: Attendance, action: "add" | "remove") => {
    queryClient.setQueryData<Attendance[]>(["attendance"], (oldData = []) => {
      if (action === "add") {
        return [...oldData, attendance];
      } else {
        return oldData.filter(
          (att) =>
            att.SchoolboyId !== attendance.SchoolboyId ||
            att.ColumnId !== attendance.ColumnId
        );
      }
    });
  };

  const handleError = (context: { previousData: Attendance[] }) => {
    queryClient.setQueryData(["attendance"], context.previousData);
  };

  const handleMutation = async (
    newAttendance: Attendance,
    action: "add" | "remove"
  ) => {
    await queryClient.cancelQueries(["attendance"]);
    const previousData = queryClient.getQueryData(["attendance"]);
    updateCache(newAttendance, action);
    return { previousData };
  };

  return {
    addAttendance: useMutation(postRate, {
      onMutate: (newAttendance) => handleMutation(newAttendance, "add"),
      onError: handleError,
      onSettled: () => queryClient.invalidateQueries(["attendance"]),
    }),
    removeAttendance: useMutation(postUnRate, {
      onMutate: (attendanceToRemove) =>
        handleMutation(attendanceToRemove, "remove"),
      onError: handleError,
      onSettled: () => queryClient.invalidateQueries(["attendance"]),
    }),
  };
};