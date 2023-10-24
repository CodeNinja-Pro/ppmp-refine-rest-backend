// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiInferencer } from "@refinedev/inferencer/mui";

// export const PurchaseCartItemList: React.FC<IResourceComponentsProps> = () => {
//     return <MuiInferencer />;
// };

import React, { Dispatch, SetStateAction } from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IResourceComponentsProps,
  useForm,
  useGetIdentity,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { useAutocomplete } from "@refinedev/mui";
import { useDataGridProps } from "@mui/x-data-grid/DataGrid/useDataGridProps";
import { darken, useTheme } from "@mui/material/styles";
import DataGridComp from "../../components/DataGridComp";
import {
  IPurchaseCartItem,
  IPurchaseCartItemsResourceProps,
  IUserIdentity,
} from "../../interfaces";
import { Box, Button } from "@mui/material";
import { SaveButton } from "@refinedev/mui";
import { SendOutlined } from "@mui/icons-material";
import {axiosInstance as defaultAxiosInstance} from "../../App";
import { redirect } from "react-router-dom";
import { API_URL } from "../../constants";

const storePurchase = async (purchase: IPurchaseCartItem, user: IUserIdentity) => {
    // if (isLoading.value) return;
    debugger;
    const purchaseData = {
        product_id: purchase.product.id,
        user_id: user.id,
        department_id: user.department_id,
        prepared_by: user.id,
        source_of_funding_id: purchase.source_of_funding.id,
        supply_type_id: purchase.supply_type.id,
        method: purchase.method,
        qty: purchase.qty,
        item_description: purchase.item_description,
        purchase_mode_id: purchase.purchase_mode.id
    }

    // isLoading.value = true
    // validationErrors.value = {}

    let serializedPost = new FormData()
    for (let item in purchaseData) {
        if (purchaseData.hasOwnProperty(item)) {
            serializedPost.append(item, purchaseData[item])
        }
    }

    defaultAxiosInstance.post(`${API_URL}/purchases`, serializedPost)
        .then(response => {
            console.log("success");
            // router.push({name: 'purchases.index'})
            // swal({
            //     icon: 'success',
            //     title: 'Purchase saved successfully'
            // })
        })
        .catch(error => {
            if (error.response?.data) {
                // validationErrors.value = error.response.data.errors
                console.log("error:", error);
            }
        })
        // .finally(() => isLoading.value = false)
}

export const PurchaseCartItemList: React.FC<
  IPurchaseCartItemsResourceProps
> = ({ purchaseCartItems = [], setPurchaseCartItems }) => {
  const translate = useTranslate();
  const { autocompleteProps, overtime } = useAutocomplete({
    resource: "products",
  });
  const { data: user } = useGetIdentity<IUserIdentity>();

  // const dataGridProps = useDataGridProps({});
 

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        width: 50,
      },
      {
        field: "product",
        headerName: "Product",
        type: "text",
        valueGetter: ({ row }) => {
          return row?.product?.name || "";
        },
        minWidth: 100,
        flex: 0.8,
      },
      {
        field: "IPSAS_code",
        headerName: "IPSAS_code",
        type: "text",
        minWidth: 100,
        flex: 0.8,
      },
      {
        field: "desc",
        headerName: "Item Description",
        minWidth: 100,
        flex: 0.8,
      },
      {
        field: "method",
        headerName: "Method",
        minWidth: 80,
        flex: 0.5,
      },
      {
        field: "purchase_mode",
        headerName: "Purchase Mode",
        minWidth: 80,
        flex: 0.5,
        valueGetter: ({ row }) => row?.purchase_mode?.name || "",
      },
      {
        field: "qty",
        headerName: "QTY",
        minWidth: 50,
        flex: 0.3,
      },
      {
        field: "unit",
        headerName: "UOM",
        minWidth: 50,
        flex: 0.3,
      },
      {
        field: "unit_cost",
        headerName: "Unit Cost",
        minWidth: 50,
        flex: 0.3,
      },
      {
        field: "total",
        headerName: "Total Price",
        minWidth: 50,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [translate]
  );

  return (
    <List headerButtons={({defaultButtons}) => (
        <>
        {defaultButtons}
        <SaveButton startIcon={<SendOutlined />} onClick={(event) => {
            event.preventDefault();
            // const {onFinish, formLoading, redirect} = useForm({resource: "purchases", action: "create"});
            purchaseCartItems.map((value, index) => {
                storePurchase(value, user as IUserIdentity);
            })
            console.log(123);
        }}>Submit</SaveButton>
        </>
    )}>
      <DataGridComp rows={purchaseCartItems} columns={columns} autoHeight />

    </List>
  );
};
