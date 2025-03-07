import type { AuthSession } from '~/components/@types';

export default defineNuxtPlugin(async (nuxtApp) => {
    // Skip plugin when rendering error page
    if (nuxtApp.payload.error) {
        return {};
    }
    const { data: session, refresh: updateSession } =
        await useFetch<AuthSession>('/api/auth/s');
    const loggedIn = computed(() => !!session.value?.id);

    const redirectTo = useState('authRedirect');

    addRouteMiddleware(
        'auth',
        (to) => {
            if (to.meta.auth && !loggedIn.value) {
                redirectTo.value = to.path;
                return '/auth/sign-in';
            }
        },
        { global: true },
    );

    const currentRoute = useRoute();

    if (process.client) {
        watch(loggedIn, async (loggedIn) => {
            if (!loggedIn && currentRoute.meta.auth) {
                redirectTo.value = currentRoute.path;
                await navigateTo('/auth/sign-in');
            }
        });
    }

    if (loggedIn.value && currentRoute.path === '/auth/sign-in') {
        await navigateTo(redirectTo.value || '/');
    }

    return {
        provide: {
            auth: {
                loggedIn,
                session,
                redirectTo,
                updateSession,
            },
        },
    };
});
