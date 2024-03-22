import { AchieveInfo_I } from "../interface";
import { instance } from "./instance";

export const getMonthlyAchieveAPI = async (year: number, month: number): Promise<AchieveInfo_I[] | undefined> => {
  try {
    const response = await instance.get(`/my-page/achievement?year=${year}&month=${month}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
