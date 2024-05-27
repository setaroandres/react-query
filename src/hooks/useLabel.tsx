import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers/sleep";
import { Label } from "../issues/interfaces";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2); //Just to mock waiting time and see how we can improve UX

  const { data } = await githubApi.get<Label[]>("/labels?per_page=100");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    //initialData: [], //Aca si le pones un staleTime la va a tomar como la mas fresca, sirve si tenemos toda la data de antemano
    placeholderData: [
      {
        id: 180616330,
        node_id: "MDU6TGFiZWwxODA2MTYzMzA=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Optimizing%20Compiler",
        name: "Component: Optimizing Compiler",
        color: "bfdadc",
        default: false,
      },
      {
        id: 180616332,
        node_id: "MDU6TGFiZWwxODA2MTYzMzA=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Optimizing%20Compiler",
        name: "Component: Compiler",
        color: "bfdadc",
        default: false,
      },
    ], //Tiene que ser un obj que luce como lo que estamos devolviendo. Nos sirve para mostrar una informacion antes de que aparezca la info rela y simular un tiempo de carga mucho mas rapido
    staleTime: 1000 * 60 * 60, //La data se va a mantener fresca por una hora, no se va a hacer el refresh hasta que se cumpla esa hora, a menos que el usuario lo haga
  });

  return labelsQuery;
};
