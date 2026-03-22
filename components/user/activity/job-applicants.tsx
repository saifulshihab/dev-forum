import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Job, JobApplicationStatus, Prisma } from "@/generated/prisma";
import { markJobApplicationViewed } from "@/lib/actions";
import dayjs from "@/lib/dayjs";
import {
  Building2,
  Calendar,
  EyeIcon,
  Mail,
  User2,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type TJobApplication = Prisma.JobApplicationGetPayload<{
  include: {
    user: { select: { id: true; fullName: true; dpUrl: true; email: true } };
  };
}>;

type Props = {
  isLoading: boolean;
  job: Job;
  jobApplications: TJobApplication[];
  onClose?: () => void;
};

export default function JobApplicants({
  job,
  onClose,
  isLoading,
  jobApplications
}: Props) {
  const [selectedApplication, setSelectedApplication] =
    useState<Prisma.JobApplicationGetPayload<{
      include: {
        user: {
          select: { id: true; fullName: true; dpUrl: true; email: true };
        };
      };
    }> | null>(null);

  const handleViewApplication = async (application: TJobApplication) => {
    setSelectedApplication(application);
    // Mark application as viewed
    if (application.status !== JobApplicationStatus.VIEWED) {
      await markJobApplicationViewed(application.id);
    }
  };

  const getStatusBadge = (status: JobApplicationStatus) => {
    const statusConfig = {
      [JobApplicationStatus.PENDING]: {
        label: "Pending",
        className: "border-orange-500/20 bg-orange-500/10 text-orange-400"
      },
      [JobApplicationStatus.VIEWED]: {
        label: "Viewed",
        className: "border-green-500/20 bg-green-500/10 text-green-400"
      },
      [JobApplicationStatus.DECLINED]: {
        label: "Declined",
        className: "border-red-500/20 bg-red-500/10 text-red-400"
      }
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="h-full">
      {/* Header Section */}
      <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="line-clamp-2 text-xl font-bold text-white">
                {job.title}
              </h2>
              <button
                onClick={onClose}
                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white active:scale-95"
                aria-label="Close applicants panel"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-zinc-400">
              <Building2 size={14} className="shrink-0 text-zinc-500" />
              <span className="truncate">{job.company}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
              <Calendar size={14} className="shrink-0 text-zinc-400" />
              <span>
                Deadline:{" "}
                <span className="font-medium text-zinc-400">
                  {dayjs(job.applicationDeadline).format("MMMM DD, YYYY")}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} className="text-zinc-400" />
          <span className="text-sm font-semibold text-white">
            {jobApplications.length || 0}{" "}
            {jobApplications.length === 1 ? "Applicant" : "Applicants"}
          </span>
        </div>
      </div>

      {/* Applicants List */}
      <div className="max-h-[calc(100vh-12rem)] space-y-3 overflow-y-auto p-4">
        {isLoading ? (
          <div className="space-y-3">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-zinc-800" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32 bg-zinc-800" />
                      <Skeleton className="h-4 w-48 bg-zinc-800" />
                      <Skeleton className="h-4 w-24 bg-zinc-800" />
                      <Skeleton className="h-8 w-32 rounded-md bg-zinc-800" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : jobApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users size={48} className="mb-4 text-zinc-600" />
            <p className="text-sm font-medium text-zinc-400">
              No applicants yet
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Applications will appear here when candidates apply
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobApplications.map((application) => (
              <div
                key={application.id}
                className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-zinc-700 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    {application.user.dpUrl ? (
                      <AvatarImage
                        src={application.user.dpUrl}
                        alt={application.user.fullName}
                      />
                    ) : (
                      <AvatarFallback className="bg-zinc-800">
                        <User2 className="h-6 w-6 text-zinc-400" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={`/users/${application.user.id}`}
                          className="block font-semibold text-white transition-colors hover:text-primary"
                        >
                          {application.user.fullName}
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                          <Mail size={14} className="shrink-0" />
                          <span className="truncate">
                            {application.user.email}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                          <Calendar size={12} className="shrink-0" />
                          <span>
                            Applied on{" "}
                            <span className="font-medium text-zinc-400">
                              {dayjs(application.createdAt).format(
                                "MMMM DD, YYYY"
                              )}
                            </span>
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    <Separator className="bg-zinc-800" />
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleViewApplication(application)}
                      className="w-full sm:w-auto"
                    >
                      <EyeIcon size={14} />
                      View Application Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application View Dialog */}
      {selectedApplication && (
        <Dialog
          open={!!selectedApplication}
          onOpenChange={() => setSelectedApplication(null)}
        >
          <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-900">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                Application Details
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Submitted by {selectedApplication.user.fullName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Applicant Info */}
              <div className="flex items-start gap-4 rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
                <Avatar className="h-16 w-16 shrink-0">
                  {selectedApplication.user.dpUrl ? (
                    <AvatarImage
                      src={selectedApplication.user.dpUrl}
                      alt={selectedApplication.user.fullName}
                    />
                  ) : (
                    <AvatarFallback className="bg-zinc-700">
                      <User2 className="h-8 w-8 text-zinc-400" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {selectedApplication.user.fullName}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                      <Mail size={14} />
                      <span>{selectedApplication.user.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Calendar size={12} />
                    <span>
                      Applied on{" "}
                      <span className="font-medium text-zinc-400">
                        {dayjs(selectedApplication.createdAt).format(
                          "MMMM DD, YYYY"
                        )}
                      </span>
                    </span>
                  </div>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`/users/${selectedApplication.user.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    View Full Profile
                  </Link>
                </div>
                {getStatusBadge(selectedApplication.status)}
              </div>

              {/* Cover Letter */}
              {selectedApplication.coverLetter ? (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">
                    Cover Letter
                  </h4>
                  <div className="whitespace-pre-line rounded-lg border border-zinc-800 bg-zinc-800/30 p-4 text-sm leading-relaxed text-zinc-300">
                    {selectedApplication.coverLetter}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4 text-center text-sm text-zinc-500">
                  No cover letter provided
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
