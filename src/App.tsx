import {
    Alert,
    Paper,
    Stack,
    Button,
    Snackbar,
    Checkbox,
    TextField,
    FormControlLabel,
} from '@mui/material';
import {

} from '@mui/icons-material';
import {
    Control,
    useForm,
    Controller,
    SubmitHandler,
} from 'react-hook-form';
import {
    DatePicker,
} from '@mui/x-date-pickers';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

interface IForm {
    name: string;
    lastName: string;
    email: string;
    age: number | '';
    birthday: Dayjs;
    isDeveloper: boolean;
}

interface TextFieldControllerProps {
    control: Control<IForm>;
    name: keyof (IForm);
}

const dayjsSchema = z.custom<Dayjs>(val => dayjs.isDayjs(val), "This is not a valid date");

const defaultValues: IForm = {
    name: '',
    lastName: '',
    email: '',
    age: '',
    birthday: dayjs(),
    isDeveloper: false,
};

const TextFieldController = (props: TextFieldControllerProps) => {

    const {
        name,
        control,
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    label={name}
                    variant="filled"
                    helperText={!!fieldState.error && fieldState.error?.message}
                    error={!!fieldState.error}
                    sx={{
                        width: '350px'
                    }}
                />
            )}
        />
    );
}

const alphabetic = z.string()
    .refine(val => /^([A-Za-z]|\s)+$/.test(val), {
        message: 'This field can only contain letters',
    });

const App = () => {

    const [openSnack, setOpenSnack] = useState(false);
    const onCloseSnack = () => setOpenSnack(false);

    const resolver = zodResolver(z.object({
        name: alphabetic,
        lastName: alphabetic,
        email: z.string().email(),
        age: z.coerce.number().int().min(1).max(100),
        birthday: dayjsSchema,
        isDeveloper: z.boolean(),
    }).required());

    const {
        reset,
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues,
        resolver
    });

    const onSubmit: SubmitHandler<IForm> = async data => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reset();
                setOpenSnack(true);
                console.log(data);
                resolve(true);
            }, 3000);
        });
    }

    return (
        <>
            <Snackbar
                open={openSnack}
                onClose={onCloseSnack}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert severity="success">The Information was success send!!!</Alert>
            </Snackbar>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack
                    elevation={3}
                    component={Paper}
                    alignItems="center"
                    justifyContent="space-around"
                    sx={{
                        width: '450px',
                        height: '550px',
                        padding: '20px',
                        boxSizing: 'border-box',
                        margin: '10px auto',
                    }}
                >
                    <TextFieldController control={control} name="name" />
                    <TextFieldController control={control} name="lastName" />
                    <TextFieldController control={control} name="email" />
                    <TextFieldController control={control} name="age" />
                    <Controller
                        name="birthday"
                        control={control}
                        render={({ field, fieldState }) => (
                            <DatePicker
                                {...field}
                                format="DD/MM/YYYY"
                                onChange={value => field.onChange(value as Dayjs)}
                                slotProps={{
                                    textField: {
                                        error: !!fieldState.error,
                                        helperText: !!fieldState.error && fieldState.error?.message
                                    }
                                }}
                                sx={{
                                    alignSelf: 'center',
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="isDeveloper"
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControlLabel
                                value="isDeveloper"
                                label="Are you a developer?"
                                labelPlacement="start"
                                control={<Checkbox {...field} checked={field.value} />}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            width: '200px',
                            alignSelf: 'center',
                        }}
                    >
                        Send
                    </Button>
                </Stack>
            </form>
        </>
    );
}

export default App;