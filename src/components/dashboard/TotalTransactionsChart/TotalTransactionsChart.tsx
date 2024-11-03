import useTransactionChart from "@/components/hooks/useTransactionChart";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { name: "Mar'24", Complete: 0, Pending: 0 },
    { name: "02 Mar", Complete: 0, Pending: 0 },
    { name: "03 Mar", Complete: 0, Pending: 0 },
    { name: "04 Mar", Complete: 0, Pending: 0 },
    { name: "05 Mar", Complete: 0, Pending: 0 },
    { name: "06 Mar", Complete: 0, Pending: 0 },
    { name: "07 Mar", Complete: 0, Pending: 0 },
    { name: "08 Mar", Complete: 0, Pending: 0 },
    { name: "09 Mar", Complete: 0, Pending: 0 },
    { name: "10 Mar", Complete: 0, Pending: 0 },
    { name: "11 Mar", Complete: 0, Pending: 0 },
    { name: "12 Mar", Complete: 0, Pending: 0 },
    { name: "13 Mar", Complete: 0, Pending: 0 },
    { name: "14 Mar", Complete: 0, Pending: 0 },
    { name: "15 Mar", Complete: 0, Pending: 0 },
    { name: "16 Mar", Complete: 0, Pending: 0 },
    { name: "17 Mar", Complete: 0, Pending: 0 },
    { name: "18 Mar", Complete: 0, Pending: 0 },
    { name: "19 Mar", Complete: 0, Pending: 0 },
    { name: "20 Mar", Complete: 0, Pending: 0 },
    { name: "21 Mar", Complete: 0, Pending: 0 },
    { name: "22 Mar", Complete: 0, Pending: 0 },
    { name: "23 Mar", Complete: 0, Pending: 0 },
    { name: "24 Mar", Complete: 0, Pending: 0 },
    { name: "25 Mar", Complete: 0, Pending: 0 },
    { name: "26 Mar", Complete: 0, Pending: 0 },
    { name: "27 Mar", Complete: 0, Pending: 0 },
    { name: "28 Mar", Complete: 0, Pending: 0 },
    { name: "29 Mar", Complete: 0, Pending: 0 },
    { name: "30 Mar", Complete: 0, Pending: 0 },
    { name: "01 Apr", Complete: 0, Pending: 0 },
];

// Calculate max y-axis value with some padding
const yValue = data.reduce((acc, cur) => Math.max(acc, cur.Complete, cur.Pending), 0) + 10;

const TotalTransactionsChart = () => {
    const [transactionChart] = useTransactionChart();
    // console.log(transactionChart);
    return (
        <div>
            <div className="bg-white pt-6 rounded-xl">
                <h1 className="font-semibold pl-4">Total Transaction Chart</h1>

                {/* Large Screen Chart */}
                <div className="hidden lg:block">
                    <ResponsiveContainer minHeight={200} minWidth={200} width="99%" height="100%" aspect={2.3}>
                        <LineChart
                            margin={{ top: 40, right: 10, left: -30, bottom: 0 }}
                            data={transactionChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" axisLine={false} className="text-[8px]" />
                            <YAxis className="text-xs" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Pending" stroke="#723eeb" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Completed" stroke="#0ac484" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Small Screen Chart */}
                <div className="lg:hidden">
                    <ResponsiveContainer minHeight={200} minWidth={200} width="99%" height="50%" aspect={1.5}>
                        <LineChart
                            margin={{ top: 40, right: 10, left: -30, bottom: 0 }}
                            data={transactionChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" axisLine={false} className="text-[8px]" />
                            <YAxis className="text-xs" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Pending" stroke="#723eeb" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Completed" stroke="#0ac484" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default TotalTransactionsChart;
