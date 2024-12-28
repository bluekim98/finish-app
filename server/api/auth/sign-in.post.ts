import { H3Event } from 'h3';
import cookieParser from 'cookie';
import { useAuthSession } from '~/server/utils/session';

export default eventHandler(async (event: H3Event) => {
    const session = await useAuthSession(event);
    const apiUri = process.env.FINISH_API_URL;
    const url = `${apiUri}/auth/sign-in`;
    const body = await readBody(event);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    try {
        const data = await response.json();
        if (!data || !data.id) {
            return {
                error: {
                    message: '계정 정보를 확인해주세요',
                },
            };
        } else {
            const cookies = response.headers.get('Set-Cookie') ?? '';
            const cookieSet = cookieParser.parse(cookies);

            await session.update({
                id: data.id.toString(),
                name: data.name,
                accessToken: cookieSet.Authentication,
                refreshToken: cookieSet.Refresh,
            });

            return { error: null, data: session };
        }
    } catch (e) {
        return {
            error: {
                message: '로그인중 오류가 발생했습니다.',
            },
        };
    }
});
