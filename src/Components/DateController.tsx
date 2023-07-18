import {
    DatePicker,
} from '@mui/x-date-pickers';
import {
    Control,
    Controller,
} from 'react-hook-form';
import Styles from '../Styles';
import { Dayjs } from 'dayjs';
import { IForm } from './Form';

interface DateControllerProps {
    control: Control<IForm>;
    label: string;
}

const DateController = (props: DateControllerProps) => {

    const {
        control,
        label,
    } = props;

    return (
        <Controller
            name="birthday"
            control={control}
            render={({ field, fieldState }) => (
                <DatePicker
                    {...field}
                    label={label}
                    format="DD/MM/YYYY"
                    onChange={value => field.onChange(value as Dayjs)}
                    slotProps={{
                        textField: {
                            error: !!fieldState.error,
                            helperText: !!fieldState.error && fieldState.error?.message
                        }
                    }}
                    sx={Styles.Form.datePicker}
                />
            )}
        />
    );
}

export default DateController;