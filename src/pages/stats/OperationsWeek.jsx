import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Loader from "../../components/global/Loader";
import { getOperationsWeek } from "./getStats";

const OperationsWeek = () => {
  const [allTxs, setAllTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTx = await getOperationsWeek();
        setAllTxs(allTx);
      } catch (error) {
        console.error("Error fetching all tx data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //   const filteredData = allTxs?.filter(({ period }) => {
  //     const currentDate = new Date();
  //     const txDate = new Date(period);
  //     const oneWeekAgo = new Date();
  //     oneWeekAgo.setDate(currentDate.getDate() - 7);
  //     return txDate >= oneWeekAgo;
  //   });

  const chartData = allTxs.map(({ period, count }) => ({
    period: period,
    count,
  }));

  const maxCount = Math.max(...chartData.map((item) => item.count));

  return (
    <div style={{ width: "100%", margin: 2 }}>
      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} fontSize={12}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8F61D0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8F61D0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="period" />
            <YAxis domain={[0, maxCount]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8F61D0"
              strokeWidth={2} // border Thickness
              fill="url(#colorUv)" // Fill with linear gradient
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OperationsWeek;
