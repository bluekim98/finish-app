import type { H3Event, SessionConfig } from 'h3';
import type { AuthSession } from '~/components/@types';

export const useAuthSession = async (event: H3Event) => {
    const isLocal = process.env.ENV_NAME === 'local';

    const sessionAuth = useRuntimeConfig().auth || {
        name: 's',
        password: 'default123456789123456789001234567890',
    };

    const sessionConfig: SessionConfig = {
        ...sessionAuth,
        cookie: {
            httpOnly: !isLocal,
            secure: !isLocal,
        },
    };

    const session = await useSession<AuthSession>(event, sessionConfig);

    return session;
};
