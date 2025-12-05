import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { Job, JobApplicationStatus, Prisma } from "@/generated/prisma";
import { markJobApplicationViewed } from "@/lib/actions/job-actions";
import dayjs from "@/lib/dayjs";
import { EyeIcon, Mail, User2, X } from "lucide-react";
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

  return (
    <div className="rounded-lg bg-zinc-900 p-4">
      {/* Job Header */}
      <div className="space-y-1">
        <div>
          <div className="flex justify-end">
            <button
              className="text-zinc-400 transition active:scale-95"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>
          <h2 className="line-clamp-1 cursor-pointer text-lg font-bold text-white">
            {job.title}
          </h2>
        </div>
        <p className="text-sm text-zinc-400">{job.company}</p>
        <p className="text-sm text-zinc-400">
          Deadline : {dayjs(job.applicationDeadline).format("DD/MM/YYYY")}
        </p>
      </div>
      {/* Applicants List */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-3 space-y-3">
          {jobApplications.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-400">
              No applicants yet.
            </div>
          ) : (
            <>
              <p className="font-semibold">
                Applicants ({jobApplications.length || 0})
              </p>
              {jobApplications.map((application) => (
                <Card key={application.id} className="bg-zinc-900">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          {application.user.dpUrl ? (
                            <AvatarImage
                              src={application.user.dpUrl}
                              alt={application.user.fullName}
                            />
                          ) : (
                            <AvatarFallback>
                              <User2 className="h-5 w-5" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="space-y-2">
                          <div className="flex-1">
                            <Link
                              target="_blank"
                              rel="noreferrer"
                              href={`/users/${application.user.id}`}
                              className="font-semibold text-zinc-100 hover:underline"
                            >
                              {application.user.fullName}
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                              <Mail className="h-4 w-4" />
                              <span>{application.user.email}</span>
                            </div>
                            <div className="mt-1 text-sm text-zinc-500">
                              Applied on{" "}
                              {dayjs(application.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleViewApplication(application)}
                          >
                            <EyeIcon />
                            View Application
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      )}

      {/* Application View Dialog */}
      {selectedApplication && (
        <Dialog
          open={!!selectedApplication}
          onOpenChange={() => setSelectedApplication(null)}
        >
          <DialogContent className="max-w-md border-zinc-800 bg-zinc-900 text-zinc-100">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Submitted by {selectedApplication.user.fullName}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  {selectedApplication.user.dpUrl ? (
                    <AvatarImage
                      src={selectedApplication.user.dpUrl}
                      alt={selectedApplication.user.fullName}
                    />
                  ) : (
                    <AvatarFallback>
                      <User2 className="h-6 w-6" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-semibold">
                    {selectedApplication.user.fullName}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {selectedApplication.user.email}
                  </div>
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`/users/${selectedApplication.user.id}`}
                    className="mt-1 block text-sm text-primary hover:underline"
                  >
                    View Full Profile
                  </Link>
                </div>
              </div>
              <div className="text-sm text-zinc-400">
                Applied on{" "}
                {dayjs(selectedApplication.createdAt).format("DD/MM/YYYY")}
              </div>
              {/* Example: Show cover letter or other fields if available */}
              {selectedApplication.coverLetter && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Cover Letter</p>
                  <div className="whitespace-pre-line rounded bg-zinc-800 p-3 text-sm text-zinc-400">
                    {selectedApplication.coverLetter}
                  </div>
                </div>
              )}
            </div>
            <DialogClose className="mt-4 rounded bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700">
              Close
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
