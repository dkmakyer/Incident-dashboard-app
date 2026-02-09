import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SeverityChartProps {
    data: { name: string; value: number }[];
}

const SeverityChart = ({ data }: SeverityChartProps) => {
    return (
        <div className="chart-container">
            <h3>Incident Severity</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Count" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SeverityChart;
