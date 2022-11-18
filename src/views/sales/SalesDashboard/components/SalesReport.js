import React from "react";
import { Card } from "components/ui";
import { Chart } from "components/shared";

const SalesReport = ({ className, data = {}, type }) => {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h4>Salary Report</h4>
      </div>
      <Chart
        series={data.series}
        xAxis={data.categories}
        height="280px"
        customOptions={{ legend: { show: false } }}
        type={type}
      />
    </Card>
  );
};

export default SalesReport;
