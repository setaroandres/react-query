import { useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../helpers";
import { getIssueComments, getIssueInfo } from "../../hooks/useIssue";
import { Issue, State } from "../interfaces";

interface IssueItemProps {
  issue: Issue;
}

export const IssueItem = ({ issue }: IssueItemProps) => {
  const queryClient = useQueryClient(); //Get the queryClient to manage queries
  const navigate = useNavigate();

  //Function to preFetch query to avoiding waiting time once user enter to the issue (to store method on cache)
  const preFetchData = () => {
    //Make a preFetchQuery here
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number],
      queryFn: () => getIssueInfo(issue.number),
    });

    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number, "comments"],
      queryFn: () => getIssueComments(issue.number),
    });
  };

  //Function to preFetch query to avoiding waiting time once user enter to the issue, but here we send the data, not the method (to be stored on chache)
  //A diff with preFetchData is that we don't trigger backend queries, we are just preSetting the data in cache
  const preSetData = () => {
    //Make a preFetchQuery here
    queryClient.setQueryData(
      ["issue", issue.number],
      issue //Instead of method, we send the data to be stored on cache
      //We can stablish refresh date, if we know that the data is not going to be refreshed in certain time, we can consider the data as fresh to avoid requests to the backend
      /*{
        updatedAt: new Date().getTime() + 10000000
      }*/
    );
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      // onMouseEnter={preFetchData} //If we dont send any argument we can send just the reference
      onMouseEnter={preSetData} //If we dont send any argument we can send just the reference
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened {timeSince(issue.created_at.toString())} days ago by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
          <div>
            {issue.labels.map((label) => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{ backgroundColor: `#${label.color}`, color: "black" }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
