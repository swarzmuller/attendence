import { createBrowserRouter } from "react-router-dom";
import { AttendanceTable, StudentInfo } from "@/components";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <AttendanceTable />,
      },
      {
        path: "/student/:id",
        element: <StudentInfo />,
      },
    ],
  },
]);
