import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers/sleep";
import { Issue } from "../issues/interfaces";

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2); //Just to mock waiting time and see how we can improve UX
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async(issueNumber: number): Promise<Issue[]> => {
  await sleep(2); //Just to mock waiting time and see how we can improve UX
  const {data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  
  const commentsQuery = useQuery({
    queryKey: ["issue", issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueQuery.data?.number as number),
    //If we need to wait for issueQuery to execute commentsQuery...
    enabled: issueQuery.data !== undefined, //(!!issueQuery.data)
  })

  return {
    issueQuery,
    commentsQuery,
  };
};
