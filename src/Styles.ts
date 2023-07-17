import {
    Theme,
    SxProps,
} from '@mui/material';
import { pink } from '@mui/material/colors'
import hexagonPatternSoft from './assets/hexagon-pattern-soft.svg';
import hexagonPattern from './assets/hexagon-pattern.svg';
import waveHaikei from './assets/wave-haikei.svg';
import { CSSProperties } from 'react';

export default {
    App: {
        hero: ((theme: Theme) => ({
            minHeight: '100vh',
            backgroundImage: `
                    url(${waveHaikei}),
                    linear-gradient(120deg, #7b6ceb 0%, #a46dd5af 42%, #e473a40f 100%),
                    url(${hexagonPattern}),
                    linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)
                    `,
            aspectRatio: '960/600',
            backgroundSize: 'cover',
            backgroundPosition: '90% center, 0 0, 0 0',
            backgroundRepeat: 'no-repeat',

            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        })) as SxProps,

        form: {
            backgroundColor: {
                xs: pink[50],
                md: '#FFF'
            },
            backgroundImage: {
                xs: `url(${hexagonPatternSoft})`,
                md: 'none',
            },
        } as SxProps,

        heroWrapper: {
            height: '100%',
        } as SxProps,

        heroInfoWrapper: {
            paddingLeft: '20px'
        } as SxProps,

        heroInfoTitle: {
            color: '#FFF',
            maxWidth: '400px',
            fontWeight: 'bold',
            fontFamily: 'Plus Jakarta Sans Variable',
        } as SxProps,

        heroInfoContent: {
            color: '#FFF',
            maxWidth: {
                md: '330px',
                xl: '450px',
            },
            marginTop: '20px',
        } as SxProps,

        heroImage: {
            width: '300px',
        } as CSSProperties,

        formTitle: {
            marginTop: '40px',
            fontWeight: 'bold',
            fontFamily: 'Plus Jakarta Sans Variable',
            background: 'linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)',
            color: 'transparent',
            backgroundClip: 'text',
        } as SxProps,
    },

    TextFieldController: (sx: CSSProperties) =>
        ((theme: Theme) => ({
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
        })) as SxProps,

    Form: {
        wrapper: {
            padding: '20px',
            boxSizing: 'border-box',
        } as SxProps,

        nameWrapper: {
            width: '100%',
            justifyContent: 'space-between',
        } as SxProps,

        name: {
            marginRight: '20px',
        } as SxProps,

        streetWrapper: {
            width: '100%',
            justifyContent: 'space-between',
        } as SxProps,

        street: {
            marginRight: '20px',
            minWidth: '170px'
        } as SxProps,

        houseNumber: {
            marginRight: '20px',
            width: {
                xs: '130px',
                md: '100px',
            }
        } as SxProps,

        zipCode: {
            width: {
                xs: '130px',
                md: '100px',
            },
        } as SxProps,

        datePicker: {
            marginTop: {
                xs: '15px',
                md: '25px',
            },
            '& .MuiInputBase-root': {
                backgroundColor: '#FFF',
            },
            alignSelf: 'center',
        } as SxProps,

        comboBox: {
            width: '300px',
            marginTop: {
                xs: '15px',
                md: '25px',
            },
            '& .MuiInputBase-root': {
                backgroundColor: '#FFF',
            },
        } as SxProps,

        checkBox: {
            marginTop: {
                xs: '15px',
                md: '25px',
            },
            '& .MuiFilledInput-root': {
                backgroundColor: '#FFF',
            },
        } as SxProps,

        button: {
            width: '200px',
            marginTop: {
                xs: '15px',
                md: '25px',
            },
            fontWeight: 'bold',
            alignSelf: 'center',
            background: 'linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)',
        } as SxProps,
    },
} as const;