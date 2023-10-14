import { IResourceComponentsProps } from "@refinedev/core";
import { MuiCreateInferencer } from "@refinedev/inferencer/mui";
import { usePermissions } from "@refinedev/core";

export const UnitCreate: React.FC<IResourceComponentsProps> = () => {
  return <MuiCreateInferencer />;
};

