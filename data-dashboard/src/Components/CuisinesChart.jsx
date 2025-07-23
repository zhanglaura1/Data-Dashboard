import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const CuisinesChart = ({list}) => {
    if (!list) return;
    const cuisines = list.results.map((recipe) => recipe.cuisines)
    const cleanData = (cuisines) => {
        const freq = {};
        for (const item of cuisines) {
            if (item) {
                for (const c of item) {
                    if (freq[c]) {
                        freq[c]++;
                    } else {
                        freq[c] = 1;
                    }
                }
            }
        }
        const data = [];
        for (const c of Object.keys(freq)) {
            data.push({name: c, value: freq[c]});
        }
        return data;
    }
    return (
        <div>
            <h4>Cuisines Breakdown</h4>
            <BarChart width={500} height={250} data={cleanData(cuisines)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    interval={0} 
                    height={90} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}

export default CuisinesChart