import {serialize} from 'cookie';

export default async function handler(req, res) {
    res.status(200).json({ message: 'Success' });

    console.log('sdsd')
    // if (req.method === 'POST') {
    //     const { nid, password } = req.body;
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', {
    //             nid, password
    //         });
    //         if (response.ok) {
    //             const token = response.data.data.access_token;
    //               console.log(token)
    //             const serialized = serialize('token', token, {
    //                 httpOnly: true,
    //                 secure: process.env.NODE_ENV === 'production',
    //                 sameSite: 'strict',
    //                 maxAge: 3600,
    //                 path: '/',
    //             });
    //
    //             // res.setHeader('Set-Cookie', serialized);
    //             // res.status(200).json({ message: 'Success' });
    //         } else {
    //             res.status(401).json({ message: 'Invalid credentials' });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // } else {
    //     res.setHeader('Allow', ['POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
}
