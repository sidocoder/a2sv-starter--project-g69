import { Trash2 } from "lucide-react";

interface ApplicationCardProps {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'Active' | 'Closed';
  onToggleStatus: () => void; 
  onDelete: () => void; // new prop
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  name,
  description,
  start_date,
  end_date,
  status,
  onToggleStatus,
  onDelete
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <div className="flex gap-2">
          <button
            onClick={onToggleStatus}
            className={`px-3 py-1 rounded-full ${
              status === 'Active'
                ? 'bg-green-400 hover:bg-green-500 text-white'
                : 'bg-orange-300 hover:bg-orange-400 text-red-500'
            }`}
          >
            {status}
          </button>
          
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="mt-2 text-sm">
        <p>Start: {start_date}</p>
        <p>End: {end_date}</p>
      </div>
      <div className="">
        <button
            onClick={onDelete}
            className="p-1 mt-2 bg-red-100 rounded-full hover:bg-red-100 text-red-600 "
            title="Delete Cycle"
          >
            <Trash2 size={18} />
          </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
