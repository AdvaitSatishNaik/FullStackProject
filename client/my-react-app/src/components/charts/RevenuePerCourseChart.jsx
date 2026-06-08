import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function RevenuePerCourseChart({ data }) {
  return (
    <div className="chart-card">
      <h2>Revenue Per Course</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="courseName" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="revenue"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenuePerCourseChart;