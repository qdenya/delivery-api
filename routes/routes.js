
import { getDatabase, ref, push, set, get, child, onValue} from "firebase/database";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const router = app => {
    const db = getDatabase();
    
    app.get('/getRestaurants', function (request, response) {
        const getRestaurants = ref(db, 'restaurants');
        onValue(getRestaurants, (resp) => {
            //response.status(200);
            response.end(JSON.stringify(resp.val()));
        });
    });
    
    app.get('/getRestaurants/:id', (request, response) => {
        const id = request.params.id;
        const getRestaurantsById = ref(db, `restaurants/${id}`);
        onValue(getRestaurantsById, (resp) => {
            response.send(resp.val());
        });
    });

    app.get('/getRestaurants/:id/products', (request, response) => {
        const id = request.params.id;
        const getRestaurantsProducts = ref(db, `restaurants/${id}/products`);
        onValue(getRestaurantsProducts, (resp) => {
            response.send(resp.val());
        });
    });

    app.post('/createOrder', (request, response) => {

        const clientName = request.body.name;
        const cart = request.body.cart;

        const postListRef = ref(db, 'orders');
        const newPostRef = push(postListRef);

        const dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        
        set(newPostRef, {
            client: clientName,
            create: dateTime,
            update: dateTime,
            status: 'created',
            items: cart
        });
        response.send({
            status: 'ok',
            message: 'Order was created.',
            time: dateTime,
            id: newPostRef.key
        });
    });

    app.post('/signup', (request, response) => {

        const email = request.body.email;
        const password = request.body.password;

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            response.end(JSON.stringify({
                uid: user.uid,
                email: user.email,
                token: user.stsTokenManager.accessToken
            }));
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            response.end(JSON.stringify({
                code: errorCode,
                msg: errorMessage
            }));
        });
    });

    app.post('/login', (request, response) => {

        const email = request.body.email;
        const password = request.body.password;

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //response.end(JSON.stringify(user));
            response.end(JSON.stringify({
                uid: user.uid,
                email: user.email,
                token: user.stsTokenManager.accessToken
            }));
            //console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            response.end(JSON.stringify({
                code: errorCode,
                msg: errorMessage
            }));
        });
    });

};

export default router;
//module.exports = router;