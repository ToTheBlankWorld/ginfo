import Image from "next/image";
import Link from "next/link";

export interface StudentCardProps {
  registrationNo: string;
  name: string;
  program: string;
  branch: string;
  campus: string;
}

export function StudentCard({
  registrationNo,
  name,
  program,
  branch,
  campus,
}: StudentCardProps): React.ReactElement {
  const imageUrl = `https://doeresults.gitam.edu/photo/img.aspx?id=${registrationNo}`;

  return (
    <Link href={`/student/${registrationNo}`}>
      <div className="clay-card group cursor-pointer overflow-hidden p-4">
        <div className="flex gap-4">
          {/* Profile Image */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e5ddd5' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%238f7a66' font-size='40' font-weight='bold'%3E?%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Student Info */}
          <div className="flex-1 min-w-0">
            <h3 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {name}
            </h3>
            <div className="mt-1 space-y-1 text-sm text-gray-600">
              <p className="truncate">
                <span className="font-medium">ID:</span> {registrationNo}
              </p>
              <p className="truncate">
                <span className="font-medium">Program:</span> {program}
              </p>
              <p className="truncate">
                <span className="font-medium">Branch:</span> {branch}
              </p>
              <p className="text-xs text-gray-500">{campus}</p>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="flex items-center justify-center">
            <span className="text-xl text-clay-400 transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
