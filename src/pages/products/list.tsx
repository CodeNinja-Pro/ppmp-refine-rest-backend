import { IResourceComponentsProps } from "@refinedev/core";
import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { usePermissions } from "@refinedev/core";
export const ProductList: React.FC<IResourceComponentsProps> = () => {
  // <Button>123123</Button>
  const {data} = usePermissions();
  return <MuiListInferencer />;
};
