
import {
    Autocomplete,
    TextField,
} from '@mui/material';
import {
    Control,
    Controller,
} from 'react-hook-form';
import { StateList, State } from '../Utils/States';
import Styles from '../Styles';
import { IForm } from './Form';

interface ComboBoxControllerProps {
    control: Control<IForm>;
    label: string;
}

const ComboBoxController = (props: ComboBoxControllerProps) => {

    const {
        control,
        label,
    } = props;

    return (
        <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
                <Autocomplete
                    {...field}
                    options={StateList}
                    renderInput={params =>
                        <TextField
                            {...params}
                            label={label}
                            error={!!fieldState.error}
                            helperText={!!fieldState.error && fieldState.error?.message}
                        />}
                    onChange={(event, value) => field.onChange(value as State)}
                    sx={Styles.Form.comboBox}
                />
            )}
        />
    );
}

export default ComboBoxController;