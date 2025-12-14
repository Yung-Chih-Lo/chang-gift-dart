import PocketBase from 'pocketbase';

const token = process.env.POCKETBASE_TOKEN;
const url = process.env.POCKETBASE_URL;

const pb = new PocketBase(url);

pb.authStore.save(token, null);

export default pb;