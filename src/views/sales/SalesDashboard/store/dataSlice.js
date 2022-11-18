import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetSalesDashboardData } from "services/SalesService";

export const getSalesDashboardData = createAsyncThunk(
  "salesDashboard/data/getSalesDashboardData",
  async (data) => {
    const response = await apiGetSalesDashboardData(data);
    return response.data;
  }
);

export const initialFilterData = {
  status: "",
};

const dataSlice = createSlice({
  name: "salesDashboard/data",
  initialState: {
    loading: true,
    dashboardData: {},
    salarydata: [],
  },
  reducers: {
    setSalaryData: (state, action) => {
      state.salarydata = action.payload;
    },
  },
  extraReducers: {
    [getSalesDashboardData.fulfilled]: (state, action) => {
      state.dashboardData = action.payload;
      state.loading = false;
    },
    [getSalesDashboardData.pending]: (state) => {
      state.loading = true;
    },
  },
});
export const { setSalaryData } = dataSlice.actions;
export default dataSlice.reducer;
