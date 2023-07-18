import {
    Theme,
    SxProps,
} from '@mui/material';
import { pink } from '@mui/material/colors'
import hexagonPatternSoft from './assets/hexagon-pattern-soft.svg';
import hexagonPattern from './assets/hexagon-pattern.svg';
import layeredWavesHaikei from './assets/layered-waves-haikei.svg';
import waveHaikei from './assets/wave-haikei.svg';
import { CSSProperties } from 'react';

const defaultFormComponents: SxProps = {
    marginTop: {
        xs: '15px',
        md: '25px',
    }
};

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

        form: ((theme: Theme) => ({
            aspectRatio: '960/600',
            [theme.breakpoints.up('xs')]: {
                // minHeight: '100vh',
                minHeight: '770px',
                backgroundColor: pink[50],
                backgroundImage: `  
                    url(${layeredWavesHaikei}),
                    linear-gradient(120deg, ${pink[50]} 0%, transparent 100%),
                    url(${hexagonPatternSoft}),
                    linear-gradient(120deg, ${pink[50]} 0%, #e473a40f 100%)
                    `,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat, repeat',
            },
            [theme.breakpoints.up('md')]: {
                height: 'auto',
                minHeight: 'auto',
                backgroundColor: '#FFF',
                backgroundImage: 'none',
            },
        })) as SxProps,

        heroWrapper: {
            height: '100%',
        } as SxProps,

        heroInfoWrapper: {
            paddingLeft: '15px'
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

        formTitle: ((theme: Theme) => ({
            marginTop: '30px',
            fontWeight: 'bold',
            fontFamily: 'Plus Jakarta Sans Variable',
            color: '#FFF',
            [theme.breakpoints.up('md')]: {
                background: 'linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)',
                color: 'transparent',
                backgroundClip: 'text',
            },
        })) as SxProps,
    },

    TextFieldController: (sx: CSSProperties) =>
        ((theme: Theme) => ({
            ...defaultFormComponents,
            width: '100%',
            '& .MuiFilledInput-root, & .MuiFilledInput-root:hover, & .MuiFilledInput-root.Mui-focused': {
                [theme.breakpoints.down('md')]: {
                    backgroundColor: '#FFF',
                }
            },
            ...sx,
        })) as SxProps,

    Form: {
        wrapper: {
            padding: '10px 15px 20px',
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
            ...defaultFormComponents,
            '& .MuiInputBase-root': {
                backgroundColor: '#FFF',
            },
            alignSelf: 'center',
        } as SxProps,

        comboBox: {
            ...defaultFormComponents,
            width: '300px',
            '& .MuiInputBase-root': {
                backgroundColor: '#FFF',
            },
        } as SxProps,

        checkBox: {
            ...defaultFormComponents,
            '& .MuiFilledInput-root': {
                backgroundColor: '#FFF',
            },
        } as SxProps,

        button: {
            ...defaultFormComponents,
            width: '200px',
            fontWeight: 'bold',
            alignSelf: 'center',
            background: 'linear-gradient(120deg, #7b6ceb 0%, #a46dd5 42%, #e473a4 100%)',
        } as SxProps,

        wrapperSlider: {
            marginTop: {
                xs: '15px',
                md: '25px',
            },
        } as SxProps,

        slider: {
            width: '300px',
        } as SxProps,
    },
} as const;