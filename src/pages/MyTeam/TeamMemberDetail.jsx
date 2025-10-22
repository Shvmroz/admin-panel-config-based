import React from "react";
import { User, Mail, Phone, Briefcase, Calendar, Clock } from "lucide-react";
import { formatDate } from "../../lib/utils";

const TeamMemberDetail = ({ data }) => {
  if (!data) return null;

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex-shrink-0 mt-1">
        <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-sm text-gray-900 dark:text-white break-words">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-600">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {data.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data.email}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <DetailRow icon={Mail} label="Email Address" value={data.email} />
        <DetailRow icon={Phone} label="Phone Number" value={data.phone} />
        <DetailRow
          icon={Briefcase}
          label="Role"
          value={
            data.role === "admin"
              ? "Super Administrator"
              : data.role === "moderator"
              ? "Moderator"
              : data.role === "editor"
              ? "Editor"
              : data.role === "viewer"
              ? "Viewer"
              : data.role
          }
        />
        <DetailRow icon={Briefcase} label="Department" value={data.department} />
        <DetailRow
          icon={Calendar}
          label="Created Date"
          value={formatDate(data.createdAt)}
        />
        <DetailRow
          icon={Clock}
          label="Last Login"
          value={formatDate(data.lastLogin)}
        />
      </div>

      {data.bio && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Bio / Notes
          </p>
          <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
            {data.bio}
          </p>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Status:
          </span>
          <span
            className={`inline-flex items-center justify-center px-3 py-1 rounded-sm text-xs font-semibold border uppercase ${
              data.status === "active"
                ? "border-green-400 text-green-500 dark:border-green-600 dark:text-green-500"
                : data.status === "inactive"
                ? "border-red-400 text-red-500 dark:border-red-600 dark:text-red-500"
                : "border-yellow-400 text-yellow-500 dark:border-yellow-600 dark:text-yellow-500"
            }`}
          >
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetail;
