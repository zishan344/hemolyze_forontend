import { Activity, CalendarCheck, Droplet, User } from "lucide-react";

interface StatsCardsProps {
  totalDonations: number;
  upcomingDonations: number;
  totalRequest: number;
  livesImpacted: number;
}

const StatsCards = ({
  totalDonations,
  upcomingDonations,
  totalRequest,
  livesImpacted,
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="stat bg-base-100 shadow rounded-lg">
        <div className="stat-figure text-primary">
          <Droplet size={28} className="fill-primary/20 stroke-primary" />
        </div>
        <div className="stat-title">Total Donations</div>
        <div className="stat-value text-primary">{totalDonations}</div>
        <div className="stat-desc">Completed donations</div>
      </div>

      <div className="stat bg-base-100 shadow rounded-lg">
        <div className="stat-figure text-warning">
          <CalendarCheck size={28} className="stroke-warning" />
        </div>
        <div className="stat-title">Scheduled</div>
        <div className="stat-value text-warning">{upcomingDonations}</div>
        <div className="stat-desc">Upcoming donations</div>
      </div>

      <div className="stat bg-base-100 shadow rounded-lg">
        <div className="stat-figure text-accent">
          <Activity size={28} className="stroke-accent" />
        </div>
        <div className="stat-title">Blood Requests</div>
        <div className="stat-value text-accent">{totalRequest}</div>
        <div className="stat-desc">Total requests</div>
      </div>

      <div className="stat bg-base-100 shadow rounded-lg">
        <div className="stat-figure text-success">
          <User size={28} className="stroke-success" />
        </div>
        <div className="stat-title">Lives Impacted</div>
        <div className="stat-value text-success">{livesImpacted}</div>
        <div className="stat-desc">Estimated lives saved</div>
      </div>
    </div>
  );
};

export default StatsCards;
