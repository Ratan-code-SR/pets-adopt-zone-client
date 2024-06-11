
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminChart = ({ users, donation, pets }) => {
  const data = [
    { name: 'All User', value: users },
    { name: 'All Pets', value: pets },
    { name: 'All Donation', value: donation },
  ];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius="40%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

AdminChart.propTypes = {
  users: PropTypes.number.isRequired,
  pets: PropTypes.number.isRequired,
  donation: PropTypes.number.isRequired
};

export default AdminChart;

