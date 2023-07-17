import {
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import memphis from './assets/corporate-memphis.webp';
import Form from './Components/Form';
import Styles from './Styles';

const App = () => {

    return (
        <>
            <Grid container>
                <Grid
                    item
                    xs={6}
                    sx={Styles.App.hero}
                >
                    <Stack
                        sx={Styles.App.heroWrapper}
                        alignItems="center"
                        justifyContent="space-around"
                    >
                        <Stack sx={Styles.App.heroInfoWrapper}>
                            <Typography
                                variant="h3"
                                sx={Styles.App.heroInfoTitle}
                            >
                                Explore your creativity
                            </Typography>
                            <Typography sx={Styles.App.heroInfoContent}>
                                Discover new skills, meet passionate teachers and become a part of the most helpful community of creatives in the world.
                            </Typography>
                        </Stack>
                        <img
                            src={memphis}
                            alt="sample-avatar"
                            style={Styles.App.heroImage}
                        />
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={Styles.App.form}
                >
                    <Stack
                        alignItems='center'
                        justifyContent="center"
                    >
                        <Typography
                            variant="h4"
                            sx={Styles.App.formTitle}
                        >
                            Create Account
                        </Typography>
                        <Form />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default App;