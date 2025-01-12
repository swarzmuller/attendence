import api from "./interceptors";
import { Attendance, Column, Schoolboy } from "@/types";

export const getSchoolboys = async () => {
  const { data } = await api.get("/Schoolboy");
  return data.Items as Schoolboy[];
};

export const getColumns = async () => {
  const { data } = await api.get("/Column");
  return data.Items as Column[];
};

export const getAttendance = async (schoolboyId?: number) => {
  const { data } = await api.get("/Rate", {
    params: { SchoolboyId: schoolboyId },
  });
  console.log(data);
  return data.Items as Attendance[];
};

export const postRate = async (attendance: Attendance) => {
  await api.post("/Rate", {
    SchoolboyId: attendance.SchoolboyId,
    ColumnId: attendance.ColumnId,
    Title: attendance.Title,
  });
};

export const postUnRate = async (attendance: Attendance) => {
  await api.post("/UnRate", {
    SchoolboyId: attendance.SchoolboyId,
    ColumnId: attendance.ColumnId,
  });
};
