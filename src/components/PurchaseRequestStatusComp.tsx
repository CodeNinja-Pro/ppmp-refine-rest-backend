import { useGetIdentity, useTranslate } from "@refinedev/core";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import { IUserIdentity } from "../interfaces";

type PurchaseRequestStatusProp = {
    // status?: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
    status: number;
};

export const PurchaseRequestStatus: React.FC<PurchaseRequestStatusProp> = ({ status }) => {
    const t = useTranslate();
    const {data: user} = useGetIdentity<IUserIdentity>();
    let base = 0;
    if (user?.roles["Admin"]) {
        base = 2;
    } else if(user?.roles["Department Header"]) {
        base = 1;
    } else {
        base = 0;
    }

    const { palette } = useTheme();

    let color: ChipProps["color"];
    let label = "pending";

    switch (status - base) {
        case 0:
            color = "warning";
            label = "pending";
            break;
        case 1:
            color = "success";
            label = "approved";
            break;
        case -1:
            color = "error";
            label = "rejected";
            break;
        // case "Delivered":
        //     color = palette.mode === "dark" ? "default" : "secondary";
        //     break;
        // case "Cancelled":
        //     color = "error";
        //     break;
    }

    return (
        <Chip
            variant="outlined"
            size="small"
            color={color}
            label={label}
        />
    );
};