import OverviewTop from "./overviewTop";
import OverviewBottom from "./overviewBottom";
import DateComponent from "../../components/global/DateComponent";

const Overview = () => {
  return (
    <div style={{ paddingTop: "5%", paddingBottom: "20%" }}>
      <DateComponent />
      <OverviewTop />
      <OverviewBottom />
    </div>
  );
};

export default Overview;
