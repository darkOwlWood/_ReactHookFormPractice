import {
    Alert,
    Stack,
    Button,
    Snackbar,
} from '@mui/material';
import {
    useForm,
    SubmitHandler,
} from 'react-hook-form';
import SliderController from './SliderController';
import TextFieldController from './TextFieldController';
import { zodResolver } from '@hookform/resolvers/zod';
import { StateList, State } from '../Utils/States';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import Styles from '../Styles';
import z from 'zod';
import DateController from './DateController';
import ComboBoxController from './ComboBoxController';
import CheckBoxController from './CheckBoxController';

const dayjsSchema = z.custom<Dayjs>(val => dayjs.isDayjs(val), "This is not a valid date");

const stateSchema = z.custom<State>(val => StateList.includes(val as State), "This is not a valid state");

const alphabetic = z.string()
    .refine(val => /^([A-Za-z]|\s)+$/.test(val), {
        message: 'This field can only contain letters',
    });

export interface IForm {
    name: string;
    lastName: string;
    email: string;
    street: string;
    extNumber: number | '';
    zipCode: string;
    birthday: Dayjs;
    state: State;
    isDeveloper: boolean;
    experience: number;
}

const defaultValues: IForm = {
    name: '',
    lastName: '',
    email: '',
    street: '',
    extNumber: '',
    zipCode: '',
    birthday: dayjs(),
    state: StateList[0],
    isDeveloper: false,
    experience: 0,
};

const Form = () => {

    const [openSnack, setOpenSnack] = useState(false);
    const onCloseSnack = () => setOpenSnack(false);

    const resolver = zodResolver(z.object({
        name: alphabetic,
        lastName: alphabetic,
        email: z.string().email(),
        street: z.string().nonempty().max(100),
        extNumber: z.coerce.number().int().min(1, 'Invalid No.').max(999999, 'Invalid No.'),
        zipCode: z.string().regex(/^\d{5}$/, 'Invalid code'),
        birthday: dayjsSchema,
        state: stateSchema,
        isDeveloper: z.boolean(),
        experience: z.number().int(),
    }).required());

    const {
        reset,
        watch,
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues,
        resolver
    });

    const isDeveloper = watch('isDeveloper');

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
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success">The Information was success send!!!</Alert>
            </Snackbar>
            <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack
                    alignItems="center"
                    justifyContent="space-around"
                    sx={Styles.Form.wrapper}
                >
                    <Stack
                        flexDirection={{ md: 'row' }}
                        sx={Styles.Form.nameWrapper}
                    >
                        <TextFieldController
                            name="name"
                            label="Name"
                            control={control}
                            sx={Styles.Form.name}
                        />
                        <TextFieldController
                            name="lastName"
                            label="Last Name"
                            control={control}
                        />
                    </Stack>
                    <TextFieldController
                        name="email"
                        label="Email"
                        control={control}
                    />
                    <Stack
                        flexDirection={{ md: 'row', }}
                        sx={Styles.Form.streetWrapper}
                    >
                        <TextFieldController
                            name="street"
                            label="Street"
                            control={control}
                            sx={Styles.Form.street}
                        />
                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <TextFieldController
                                label="Number"
                                name="extNumber"
                                control={control}
                                sx={Styles.Form.houseNumber}
                            />
                            <TextFieldController
                                name="zipCode"
                                label="Zip Code"
                                control={control}
                                sx={Styles.Form.zipCode}
                            />
                        </Stack>
                    </Stack>
                    <DateController control={control} label="Birthday" />
                    <ComboBoxController control={control} label="State" />
                    <CheckBoxController control={control} label="Are you a developer?" />
                    {
                        isDeveloper ?
                            <SliderController label="Experience" control={control} />
                            : null
                    }
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={Styles.Form.button}
                    >
                        Sign up
                    </Button>
                </Stack>
            </form>
        </>
    );
}

export default Form;