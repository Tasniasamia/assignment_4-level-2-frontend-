import React from "react";

type DashboardCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

const DashboardCard = ({ title, value, subtitle }: DashboardCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 bg-priarmy opacity-10 rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-300" />

      <div className="relative p-6 sm:p-8">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">
          {title}
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-3xl sm:text-4xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
      </div>

      <div className="h-1 w-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default DashboardCard;
