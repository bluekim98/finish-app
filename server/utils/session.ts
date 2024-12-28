import type { H3Event, SessionConfig } from 'h3';
import type { AuthSession } from '~/components/@types';

const sessionConfig: SessionConfig = useRuntimeConfig().auth || {
    name: 's',
    password: 'default123456789123456789001234567890',
};

export const useAuthSession = async (event: H3Event) => {
    const session = await useSession<AuthSession>(event, sessionConfig);
    return session;
};

export const requireAuthSession = async (event: H3Event) => {
    const session = await useAuthSession(event);
    if (!session.data.id) {
        throw createError({
            message: 'Not Authorized',
            statusCode: 401,
        });
    }
    return session;
};
