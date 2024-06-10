import PropTypes from 'prop-types';

import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
const COLORS = ['#aa5fe9', '#ee468b', '#1fa9d7'];
const UserChart = ({  campaign, donation, pets }) => {
  const data = [
    { name: 'All Campaign', value: campaign },
    { name: 'All Added Pets', value: pets },
    { name: 'All Donations', value: donation },
  ];

  return (
    <PieChart width={500} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
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
  );
};
UserChart.propTypes = {
  pets: PropTypes.number.isRequired,
  campaign: PropTypes.number.isRequired,
  donation: PropTypes.number.isRequired
};

export default UserChart;
