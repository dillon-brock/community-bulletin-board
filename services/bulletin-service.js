const SUPABASE_URL = 'https://nwxkvnsiwauieanvbiri.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzAwMzQzNCwiZXhwIjoxOTUyNTc5NDM0fQ.8XIsU0FANdaNeQnT-DojpTL-GTlTPZ4CYZDEetpFpWc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function signUp(email, password) {
    return client.auth.signUp({ email, password });
}

export async function signIn(email, password) {
    return client.auth.signIn({ email, password });
}

export async function signOut() {
    return client.auth.signOut();
}

export async function getBulletins() {
    console.log('getting bulletins');
    const response = await client
        .from('posts')
        .select();
    return response.data;
}