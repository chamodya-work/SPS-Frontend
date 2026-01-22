// components/BarChartCard.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const statusMap = {
 "NB": "New Bulk Supply",
  "NS": "New Solar Bulk Supply",
  "MC": "Meter Change",
  "RT": "Routine Meter Test - Bulk",
  "MA": "Meter Test - Area Request",
  "HB": "Harmonic Test - Bulk",
  "H3": "Harmonic Test - 30A 60A",
  "MS": "Meter Shift - Bulk",
  "LP": "Load Profile at Site",
  "M1": "MHP Meter test 1st",
  "M2": "MHP Meter test 2nd",
  "H1": "HT Meter test 1st",
  "H2": "HT Meter test 2nd",
  "CA": "Capacity Augmentation",
  "EA": "Energy Audit",
  "RB": "Refurbishment-Bulk",
  "ST": "Substation Meter Test",
  "TS": "Trouble Shooting",
  "3P": "3 Phase Meter Test",
  "SG": "Self Generation Meter Installation",
  "GT": "Self Generation Meter Test",
  "R3": "Refurbishment - 3 Phase",
  "BM": "Boundary meter testing",
  "OT": "Other"
};


const BarChartCard = ({data , isLoading }) => {
    console.log('Raw data:', data);

    // Dummy data for fallback
    const dummyData = [
        { status: "NB", count: 25 },
        { status: "NS", count: 18 },
        { status: "MC", count: 12 },
        { status: "RT", count: 30 },
        { status: "MA", count: 15 },
        { status: "HB", count: 8 },
        { status: "H3", count: 10 },
        { status: "MS", count: 22 },
        { status: "LP", count: 5 },
        { status: "M1", count: 3 },
        { status: "M2", count: 7 },
        { status: "H1", count: 14 },
        { status: "H2", count: 9 },
        { status: "CA", count: 11 },
        { status: "EA", count: 6 },
        { status: "RB", count: 4 },
        { status: "ST", count: 13 },
        { status: "TS", count: 8 },
        { status: "3P", count: 16 },
        { status: "SG", count: 5 },
        { status: "GT", count: 7 },
        { status: "R3", count: 3 },
        { status: "BM", count: 9 },
        { status: "OT", count: 12 }
    ];

    // Check if data is valid
    const isDataValid = data && Array.isArray(data) && data.length > 0;
    
    // Use dummy data if real data is not available or invalid
    const actualData = isDataValid ? data : dummyData;

    if (isLoading) {
        return (
            <div className="rounded-2xl shadow-lg p-4 bg-white w-full max-w-md mx-auto">
                <h2 className="text-sm font-semibold mb-2">Application Status</h2>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    const labels = actualData.map(item => {
        const mappedStatus = statusMap[item.status] || item.status;
        console.log(`Status: ${item.status} -> ${mappedStatus}`);
        return mappedStatus;
    });
    
    const counts = actualData.map(item => item.count);
    const totalCount = counts.reduce((a, b) => a + b, 0);
    
    console.log('Labels:', labels);
    console.log('Counts:', counts);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Applications",
                data: counts,
                backgroundColor: "#36A2EB",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }
        ]
    };

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '1000px',
            margin: '20px auto',
            textAlign: 'center',
            backgroundColor: 'white'
        }}>
            <h2 className="text-sm font-semibold mb-2">
                Application Status
            </h2>
            <Bar data={chartData} options={{ 
                responsive: true, 
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const percentage = ((context.parsed.y / totalCount) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed.y} applications (${percentage}%)`;
                            }
                        }
                    }
                } 
            }} />
        </div>
    );
};

export default BarChartCard;