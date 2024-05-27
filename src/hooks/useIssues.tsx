import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers/sleep";
import { Issue, State } from "../issues/interfaces";

interface useIssuesProps {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  await sleep(2); //Just to mock waiting time and see how we can improve UX

  //Here we create the seaech params to be sent to the the API
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }
  params.append('page', '1');
  params.append('per_page', '20');

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: useIssuesProps) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels }], //we can send an object to say react query we don't matter about keys order (to avoid requests to backend if we send same keys but in diff order)
    queryFn: () => getIssues(labels, state),
  });

  return {
    issuesQuery, //si queremos retornar mas queries debemos ponerlo como un objeto
  };
};
