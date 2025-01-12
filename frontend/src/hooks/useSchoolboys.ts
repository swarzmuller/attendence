import { useQuery } from "react-query";
import { getSchoolboys } from "@/api";

export const useSchoolboys = () => useQuery("schoolboys", getSchoolboys);
