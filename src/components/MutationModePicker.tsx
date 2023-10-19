import { FormControlLabel, Radio, Switch } from '@mui/material';
import { MutationMode } from '@refinedev/core'
import React from 'react'

interface Props {
    currentMutationMode: MutationMode;
    onMutationChange: (mode: MutationMode) => void
}

export const MutationModePicker: React.FC<Props> = ({
    currentMutationMode = "undoable",
    onMutationChange,
    ...props
}) => {
    return (
        <FormControlLabel sx={{backgroundColor: "rgba(1, 1, 1, 0.5)", paddingRight: 1.5, borderRadius: 10}}control={<Switch value={currentMutationMode} onChange={(_, checked) => onMutationChange(checked ? "undoable" : "pessimistic")} />} label="Undoable Mode" {...props} />
    )
}
