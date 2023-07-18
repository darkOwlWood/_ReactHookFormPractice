import {
    TextField,
    SxProps,
} from '@mui/material';
import {
    Control,
    Controller,
} from 'react-hook-form';
import { IForm } from './Form';
import Styles from '../Styles';
import { CSSProperties } from 'react';

interface TextFieldControllerProps {
    control: Control<IForm>;
    name: keyof (IForm);
    label: string;
    sx?: SxProps;
}

const TextFieldController = (props: TextFieldControllerProps) => {

    const {
        name,
        control,
        label,
        sx = {},
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    label={label}
                    variant="filled"
                    size="small"
                    helperText={!!fieldState.error && fieldState.error?.message}
                    error={!!fieldState.error}
                    sx={Styles.TextFieldController(sx as CSSProperties)}
                />
            )}
        />
    );
}

export default TextFieldController;