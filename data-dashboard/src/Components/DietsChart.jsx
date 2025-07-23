import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const DietsChart = ({list}) => {
    if (!list) return;
    const diets = list.results.map((recipe) => recipe.diets)
    const cleanData = (diets) => {
        const freq = {};
        for (const item of diets) {
            if (item) {
                for (const d of item) {
                    if (freq[d]) {
                        freq[d]++;
                    } else {
                        freq[d] = 1;
                    }
                }
            }
        }
        const data = [];
        for (const d of Object.keys(freq)) {
            if (d == "lacto ovo vegetarian") {
                data.push({name: "vegetarian", value: freq[d]})
            } else {
                data.push({name: d, value: freq[d]});
            }
        }
        return data;
    }
    return (
        <div>
            <h4>Diets Breakdown</h4>
            <BarChart width={500} height={250} data={cleanData(diets)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    interval={0} 
                    height={90} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8982caff" maxBarSize="1"/>
            </BarChart>
        </div>
    )
}

export default DietsChart