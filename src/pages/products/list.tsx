import { IResourceComponentsProps } from "@refinedev/core";
import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { usePermissions } from "@refinedev/core";
export const ProductList: React.FC<IResourceComponentsProps> = () => {
  return <MuiListInferencer />;
};
