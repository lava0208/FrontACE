import React, { useEffect } from "react";
import { Loading } from "components/shared";
import SalesReport from "./SalesReport";
import LatestOrder from "./LatestOrder";
import { setSalaryData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiGetSalaries } from "services/SalariesServices";

const SalesDashboardBody = () => {
  const dispatch = useDispatch();
  //   const [SalaryData, setSalaryData] = useState([]);

  const data = useSelector((state) => state.salesDashboard.data);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const reponse = await apiGetSalaries({ order: "ASC" });
    dispatch(setSalaryData(reponse?.data?.data));
  };
  return (
    <Loading loading={false}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SalesReport
          data={{
            series: [
              {
                name: "Series A",
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
              },
              {
                name: "Series B",
                data: [20, 29, 37, 36, 44, 45, 50, 58],
              },
            ],
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          }}
        />
        <SalesReport
          data={{
            series: [
              {
                name: "Series A",
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
              },
              {
                name: "Series B",
                data: [20, 29, 37, 36, 44, 45, 50, 58],
              },
            ],
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          }}
          type="bar"
        />
        <SalesReport
          data={{
            series: [44, 55, 41, 17, 15],
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          }}
          type="donut"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        <LatestOrder data={data?.salarydata} className="lg:col-span-3" />
      </div>
    </Loading>
  );
};

export default SalesDashboardBody;
