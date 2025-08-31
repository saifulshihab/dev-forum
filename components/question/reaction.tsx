import { Prisma } from "@/generated/prisma";
import { cn } from "@/lib/utils";

import { EllipsisIcon, Reply, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { useAuth } from "../contexts/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

type TReaction = Prisma.ReactionGetPayload<{ include: { user: true } }>;

type Props = {
  answerId: string;
  likeCount: number;
  answerUserId: string;
  dislikeCount: number;
  reactions?: TReaction[];
  handleReplyClick?: () => void;
  handleLike(answerId: string): Promise<void>;
  handleDislike(answerId: string): Promise<void>;
  handleDelete(answerId: string): Promise<void>;
  isDeleteAnswerLoading?: boolean;
};

const Reaction = (props: Props) => {
  const {
    answerId,
    likeCount,
    reactions,
    handleLike,
    dislikeCount,
    answerUserId,
    handleDelete,
    handleDislike,
    handleReplyClick,
    isDeleteAnswerLoading
  } = props;
  const { isAuthenticated, user } = useAuth();

  const [isLikePending, startLikeTransition] = useTransition();
  const [isDislikePending, startDislikeTransition] = useTransition();

  const prevLike = reactions?.find(
    (reaction) => reaction.type === "LIKE" && reaction.userId === user?.id
  );
  const prevDislike = reactions?.find(
    (reaction) => reaction.type === "DISLIKE" && reaction.userId === user?.id
  );

  const [optimisticState, setOptimisticState] = useOptimistic(
    {
      likeCount,
      reactions,
      dislikeCount,
      isLikedBefore: !!prevLike,
      isDislikedBefore: !!prevDislike
    },
    (_, optimisticStateValue: any) => optimisticStateValue
  );

  const updateOptimisticState = (reactionType: "LIKE" | "DISLIKE") => {
    if (reactionType === "LIKE") {
      let optimisticStateValue;
      if (prevLike) {
        optimisticStateValue = {
          ...optimisticState,
          likeCount: optimisticState.likeCount - 1,
          reactions: optimisticState.reactions?.filter(
            (reaction) => reaction.id !== prevLike?.id
          ),
          isLikedBefore: false
        };
      } else {
        optimisticStateValue = {
          ...optimisticState,
          likeCount: optimisticState.likeCount + 1,
          reactions: [
            ...(optimisticState.reactions || []),
            {
              id: "",
              answerId,
              userId: user?.id,
              type: "LIKE",
              user
            } as any
          ],
          isLikedBefore: true,
          dislikeCount: prevDislike
            ? optimisticState.dislikeCount - 1
            : optimisticState.dislikeCount,
          isDislikedBefore: false
        };
      }
      startLikeTransition(async () => {
        setOptimisticState(optimisticStateValue);
        await handleLike(answerId);
      });
    } else if (reactionType === "DISLIKE") {
      let optimisticStateValue;
      if (prevDislike) {
        optimisticStateValue = {
          ...optimisticState,
          dislikeCount: optimisticState.dislikeCount - 1,
          reactions: optimisticState.reactions?.filter(
            (reaction) => reaction.id !== prevLike?.id
          ),
          isDislikedBefore: false
        };
      } else {
        optimisticStateValue = {
          ...optimisticState,
          dislikeCount: optimisticState.dislikeCount + 1,
          reactions: [
            ...(optimisticState.reactions || []),
            {
              id: "",
              answerId,
              userId: user?.id,
              type: "DISLIKE",
              user
            } as any
          ],
          isDislikedBefore: true,
          likeCount: prevLike
            ? optimisticState.likeCount - 1
            : optimisticState.likeCount,
          isLikedBefore: false
        };
      }
      startDislikeTransition(async () => {
        setOptimisticState(optimisticStateValue);
        await handleDislike(answerId);
      });
    }
  };

  return (
    <div className="ml-2 mt-1 inline-flex items-center gap-4 text-muted-foreground">
      <div className="flex items-center gap-1">
        <button
          disabled={isLikePending}
          onClick={() => updateOptimisticState("LIKE")}
          className={cn("transform cursor-pointer transition active:scale-95", {
            "text-primary": optimisticState.isLikedBefore
          })}
        >
          <ThumbsUp size={14} />
        </button>
        <p className="text-xs">{optimisticState.likeCount}</p>
      </div>
      <div className="flex items-center gap-1">
        <button
          disabled={isDislikePending}
          onClick={() => updateOptimisticState("DISLIKE")}
          className={cn(
            "transform cursor-pointer transition active:scale-95",
            optimisticState.isDislikedBefore && "text-primary"
          )}
        >
          <ThumbsDown size={14} />
        </button>
        <p className="text-xs">{optimisticState.dislikeCount}</p>
      </div>
      <button
        className="flex transform cursor-pointer items-center gap-1 text-xs transition active:scale-95"
        onClick={handleReplyClick}
      >
        <Reply size={14} />
        Reply
      </button>
      {isAuthenticated && answerUserId === user?.id && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <EllipsisIcon size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="m-auto w-56">
            <DropdownMenuItem
              disabled={isDeleteAnswerLoading}
              onClick={() => handleDelete(answerId)}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Reaction;
