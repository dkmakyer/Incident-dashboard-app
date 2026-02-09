
interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

const StatCard = ({ title, value, icon, trend, className = '' }: StatCardProps) => {
    return (
        <div className={`stat-card ${className}`}>
            <div className="stat-header">
                <span className="stat-title">{title}</span>
                <div className="stat-icon">{icon}</div>
            </div>
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                {trend && (
                    <div className={`stat-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
