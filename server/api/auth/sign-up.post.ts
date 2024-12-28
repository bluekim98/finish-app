import { H3Event } from 'h3';

export default eventHandler(async (event: H3Event) => {
    const apiUri = process.env.FINISH_API_URL ?? 'http://localhost:9000';
    const url = `${apiUri}/auth/sign-up`;
    const body = await readBody(event);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...body,
            phoneNumber: body.phoneNumber.replace(/\D/g, ''),
        }),
    });
    const data = await response.json();
    if (!data || !data.id) {
        return {
            error: {
                message: '회원가입중 오류가 발생했습니다.',
            },
        };
    }
});
