import {
    Box,
    Grid,
    Alert,
    Paper,
    Stack,
    Button,
    Snackbar,
    Checkbox,
    TextField,
    Autocomplete,
    FormControlLabel,
    SxProps,
    Typography,
} from '@mui/material';
import {
    pink,
} from '@mui/material/colors';
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
import hexagonPattern from './assets/hexagon-pattern.svg';
import hexagonPatternSoft from './assets/hexagon-pattern-soft.svg';
import memphis from './assets/corporate-memphis.webp';
import waveHaikei from './assets/wave-haikei.svg';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { StateList } from './States';

type State = (typeof StateList)[number];

const dayjsSchema = z.custom<Dayjs>(val => dayjs.isDayjs(val), "This is not a valid date");

const stateSchema = z.custom<State>(val => StateList.includes(val as State), "This is not a valid state");

const alphabetic = z.string()
    .refine(val => /^([A-Za-z]|\s)+$/.test(val), {
        message: 'This field can only contain letters',
    });

interface IForm {
    name: string;
    lastName: string;
    email: string;
    street: string;
    extNumber: number | '';
    zipCode: string;
    birthday: Dayjs;
    state: State;
    isDeveloper: boolean;
}

interface TextFieldControllerProps {
    control: Control<IForm>;
    name: keyof (IForm);
    label: string;
    sx?: SxProps;
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
};

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
                    helperText={!!fieldState.error && fieldState.error?.message}
                    error={!!fieldState.error}
                    sx={theme => ({
                        width: '100%',
                        marginTop: {
                            xs: '15px',
                            md: '25px',
                        },
                        '& .MuiFilledInput-root': {
                            [theme.breakpoints.down('md')]: {
                                backgroundColor: '#FFF',
                            }
                        },
                        ...sx,
                    })}
                />
            )}
        />
    );
}

const App = () => {

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
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success">The Information was success send!!!</Alert>
            </Snackbar>
            <Grid container>
                <Grid
                    item
                    xs={6}
                    sx={theme => ({
                        minHeight: '100vh',
                        backgroundImage: `
                            url(${waveHaikei}),
                            linear-gradient(120deg, #7b6ceb 0%, #a46dd5af 42%, #e473a40f 100%),
                            url(${hexagonPattern}),
                            linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)
                            `,
                        // linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)
                        // backgroundImage: `url(${waveHaikei})`,
                        aspectRatio: '960/600',
                        backgroundSize: 'cover',
                        backgroundPosition: '90% center, 0 0, 0 0',
                        backgroundRepeat: 'no-repeat',

                        [theme.breakpoints.down('md')]: {
                            display: 'none',
                        }
                    })}
                >
                    <Stack
                        sx={{
                            height: '100%',
                        }}
                        alignItems="center"
                        justifyContent="space-around"
                    >
                        <Stack
                            sx={{
                                paddingLeft: '20px'
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    color: '#FFF',
                                    maxWidth: '400px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Plus Jakarta Sans Variable',
                                }}
                            >
                                Explore your creativity
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#FFF',
                                    maxWidth: {
                                        md: '330px',
                                        xl: '450px',
                                    },
                                    marginTop: '20px',
                                }}
                            >
                                Discover new skills, meet passionate teachers and become a part of the most helpful community of creatives in the world.
                            </Typography>
                        </Stack>
                        <img
                            alt=""
                            src={memphis}
                            style={{
                                width: '300px',
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        backgroundColor: {
                            xs: pink[50],
                            md: '#FFF'
                        },
                        backgroundImage: {
                            xs: `url(${hexagonPatternSoft})`,
                            md: 'none',
                        },
                    }}
                >
                    <Stack
                        alignItems='center'
                        justifyContent="center"
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                marginTop: '40px',
                                fontWeight: 'bold',
                                fontFamily: 'Plus Jakarta Sans Variable',
                                background: 'linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)',
                                color: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Create Account
                        </Typography>
                        <form
                            action=""
                            method="POST"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Stack
                                // elevation={3}
                                // component={Paper}
                                alignItems="center"
                                justifyContent="space-around"
                                sx={{
                                    // width: '650px',
                                    // height: '650px',
                                    padding: '20px',
                                    boxSizing: 'border-box',
                                    // margin: '10px auto',
                                }}
                            >
                                <Stack
                                    flexDirection={{
                                        md: 'row'
                                    }}
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <TextFieldController
                                        name="name"
                                        label="Name"
                                        control={control}
                                        sx={{ marginRight: '20px' }}
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
                                    flexDirection={{
                                        md: 'row',
                                    }}
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <TextFieldController
                                        name="street"
                                        label="Street"
                                        control={control}
                                        sx={{
                                            marginRight: '20px',
                                            minWidth: '170px'
                                        }}
                                    />
                                    <Stack flexDirection="row" justifyContent="space-between">
                                        <TextFieldController
                                            label="Number"
                                            name="extNumber"
                                            control={control}
                                            sx={{
                                                marginRight: '20px',
                                                width: {
                                                    xs: '130px',
                                                    md: '100px',
                                                }
                                            }}
                                        />
                                        <TextFieldController
                                            name="zipCode"
                                            label="Zip Code"
                                            control={control}
                                            sx={{
                                                width: {
                                                    xs: '130px',
                                                    md: '100px',
                                                },
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                                <Controller
                                    name="birthday"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <DatePicker
                                            {...field}
                                            label="Birthday"
                                            format="DD/MM/YYYY"
                                            onChange={value => field.onChange(value as Dayjs)}
                                            slotProps={{
                                                textField: {
                                                    error: !!fieldState.error,
                                                    helperText: !!fieldState.error && fieldState.error?.message
                                                }
                                            }}
                                            sx={{
                                                marginTop: {
                                                    xs: '15px',
                                                    md: '25px',
                                                },
                                                '& .MuiInputBase-root': {
                                                    backgroundColor: '#FFF',
                                                },
                                                alignSelf: 'center',
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Autocomplete
                                            {...field}
                                            options={StateList}
                                            sx={{
                                                width: '300px',
                                                marginTop: {
                                                    xs: '15px',
                                                    md: '25px',
                                                },
                                                '& .MuiInputBase-root': {
                                                    backgroundColor: '#FFF',
                                                },
                                            }}
                                            renderInput={params =>
                                                <TextField
                                                    {...params}
                                                    label="State"
                                                    error={!!fieldState.error}
                                                    helperText={!!fieldState.error && fieldState.error?.message}
                                                />}
                                            onChange={(event, value) => field.onChange(value as State)}
                                        />
                                    )}
                                />
                                <Controller
                                    name="isDeveloper"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <FormControlLabel
                                            value="isDeveloper"
                                            labelPlacement="start"
                                            label="Are you a developer?"
                                            control={<Checkbox {...field} checked={field.value} />}
                                            sx={{
                                                marginTop: {
                                                    xs: '15px',
                                                    md: '25px',
                                                },
                                                '& .MuiFilledInput-root': {
                                                    backgroundColor: '#FFF',
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{
                                        width: '200px',
                                        marginTop: {
                                            xs: '15px',
                                            md: '25px',
                                        },
                                        fontWeight: 'bold',
                                        alignSelf: 'center',
                                        background: 'linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)',
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default App;