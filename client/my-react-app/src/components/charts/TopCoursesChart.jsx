import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function TopCoursesChart({ data }) {
  return (
    <div className="chart-card">
      <h2>Top Courses</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="courseName" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="totalStudents"
            fill="#10b981"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopCoursesChart;