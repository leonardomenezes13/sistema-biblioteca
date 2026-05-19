type Props = {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
};

export default function StatsCard({ title, value, description, icon }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        <p className="mt-0.5 text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
