import { useQuery } from "react-query";
import { getColumns } from "@/api";

export const useColumns = () => useQuery("columns", getColumns);
