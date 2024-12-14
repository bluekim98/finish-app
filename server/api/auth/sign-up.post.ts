import { H3Event } from 'h3';

export default eventHandler(async (event: H3Event) => {
    const apiUri = process.env.FINISH_API_URL ?? 'http://localhost:9000';
    const url = `${apiUri}/user/sign-up`;
    const body = await readBody(event);

    const response = await $fetch(url, {
        method: 'POST',
        body,
    });

    return response;
});
