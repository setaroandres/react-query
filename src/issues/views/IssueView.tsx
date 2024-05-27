import { Link, Navigate, useParams } from "react-router-dom";
import { useIssue } from "../../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueComment } from "../components/IssueComment";

export const IssueView = () => {
  const params = useParams();
  const { id = "0" } = params;

  const { issueQuery, commentsQuery } = useIssue(Number(id)); //Custom hook to get all the info for each issue

  //If we have the data in cache we can show the user the data without the loading

  if (issueQuery.isLoading) return <LoadingIcon />;

  if (!issueQuery.data) return <Navigate to={"./issues/list"} />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      {/* User comment */}
      <IssueComment issue={issueQuery.data} />

      {/* Comments / Responses */}
      {commentsQuery.isLoading && <LoadingIcon />}

      {commentsQuery.data?.map((issue) => (
        <IssueComment key={issue.id} issue={issue} />
      ))}
    </div>
  );
};
