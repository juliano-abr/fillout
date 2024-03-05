import axios from "axios";
import { SubmissionsParams } from "../utils/types";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

export const getAllSubmissions = async (
  formId: string,
  params: SubmissionsParams
) => {
  const url = `${BASE_URL}/${formId}/submissions`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params,
  });

  return response.data.responses;
};
