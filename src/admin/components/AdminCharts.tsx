import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { monthlyPerformance, trafficSources } from "@/admin/data";

const sourceColors = ["#1d4ed8", "#ef3525", "#0f766e", "#64748b"];

export function PerformanceChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyPerformance} margin={{ left: -18, right: 8, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.24} />
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="leadsFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#ef3525" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#ef3525" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              border: "1px solid #e2e8f0",
              boxShadow: "0 16px 40px -24px rgba(15,23,42,.35)",
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#1d4ed8"
            fill="url(#viewsFill)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="leads"
            stroke="#ef3525"
            fill="url(#leadsFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConversionChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyPerformance} margin={{ left: -22, right: 8, top: 8 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip cursor={{ fill: "#f8fafc" }} />
          <Bar dataKey="conversions" fill="#07111f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrafficSourcesChart() {
  return (
    <div className="grid gap-5 sm:grid-cols-[12rem_1fr] sm:items-center">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={trafficSources}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={76}
              paddingAngle={3}
            >
              {trafficSources.map((entry, index) => (
                <Cell key={entry.name} fill={sourceColors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3">
        {trafficSources.map((source, index) => (
          <div key={source.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 font-semibold text-slate-700">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: sourceColors[index] }}
              />
              {source.name}
            </span>
            <span className="font-black text-slate-950">{source.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
