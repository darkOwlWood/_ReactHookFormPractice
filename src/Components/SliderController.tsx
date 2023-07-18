import {
    Stack,
    Slider,
    Typography,
} from '@mui/material';
import {
    Control,
    Controller,
} from 'react-hook-form';
import { IForm } from './Form';
import Styles from '../Styles';

interface SliderControllerProps {
    control: Control<IForm>;
    label: string;
}

const marks = [
    {
        value: 0,
        label: 'trainee',
    },
    {
        value: 3,
        label: 'junior',
    },
    {
        value: 7,
        label: 'semi senior',
    },
    {
        value: 10,
        label: 'senior',
    },
];

const SliderController = (props: SliderControllerProps) => {

    const {
        control,
        label,
    } = props;

    return (
        <Stack
            alignItems="center"
            sx={Styles.Form.wrapperSlider}
        >
            <Typography>{`${label}:`}</Typography>
            <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                    <Slider
                        {...field}
                        max={10}
                        marks={marks}
                        sx={Styles.Form.slider}
                        onChange={(event: Event, value: number | number[]) => field.onChange(value as number)}
                    />
                )}
            />
        </Stack>
    );
}

export default SliderController;