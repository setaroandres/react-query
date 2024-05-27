import { useLabels } from "../../hooks/useLabel";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

interface LabelPickerProps {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker = ({selectedLabels, onChange}: LabelPickerProps) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return <LoadingIcon />;
  //La dif con isFetching es que el isLoading se ejecuta cuando no tenemos nada de data, si tenemos en el cache no se va a disparar
  //Podemos tener este return arriba asi no sigue ejecutando si esta cargando

  return (
    <div>
      {labelsQuery.data?.map(({color, id, name}) => (
        <span
          key={id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(name) ? 'label-active': ''}`}
          style={{ border: `1px solid #${color}`, color: `#${color}` }}
          onClick={() => onChange(name)}
        >
          {name}
        </span>
      ))}
    </div>
  );
};
