import {
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import {
    Control,
    Controller,
} from 'react-hook-form';
import Styles from '../Styles';
import {IForm} from './Form';

interface CheckBoxControllerProps {
    control: Control<IForm>;
    label: string;
}

const CheckBoxController = (props: CheckBoxControllerProps) => {

    const {
        control,
        label,
    } = props;

    return (
        <Controller
            name="isDeveloper"
            control={control}
            render={({ field, fieldState }) => (
                <FormControlLabel
                    value="isDeveloper"
                    labelPlacement="start"
                    label={label}
                    control={<Checkbox {...field} checked={field.value} />}
                    sx={Styles.Form.checkBox}
                />
            )}
        />
    );
}

export default CheckBoxController;