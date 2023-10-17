import { IResourceComponentsProps } from "@refinedev/core";
import { MuiCreateInferencer } from "@refinedev/inferencer/mui";
import { usePermissions } from "@refinedev/core";

export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
  // const { data: permissionsData } = usePermissions();
  return <MuiCreateInferencer />;
};

