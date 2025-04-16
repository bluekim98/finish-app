export default eventHandler(async (event) => {
    console.log('1@@@@@');
    const session = await useAuthSession(event);
    console.log('alsdkfjalsdkfjalsdkfjlaskdfjalsdkfj');
    console.log({ session: session.data });
    return session.data;
});
