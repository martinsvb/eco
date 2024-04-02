import { FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { CustomFieldControllerProps } from "./customField";
import CutomTextFieldController from "./CustomTextFieldController";

interface CutomTextFieldControllerGridProps {
  grid: Grid2Props;
}

const CutomTextFieldControllerGrid = <T extends FieldValues>({
  grid,
  ...rest
}: CustomFieldControllerProps<T> & CutomTextFieldControllerGridProps) => {
  return (
    <Grid {...grid}>
      <CutomTextFieldController {...rest} />
    </Grid>
  );
};

export default CutomTextFieldControllerGrid;
