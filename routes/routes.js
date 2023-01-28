
import { getDatabase, ref, push, set, get, child, onValue} from "firebase/database";

const router = app => {
    const db = getDatabase();
    

    app.get('/getRestaurants', (request, response) => {
        const getRestaurants = ref(db, 'restaurants');
        onValue(getRestaurants, (resp) => {
            response.send(resp.val());
            response.status(200);
        });
        // get(child(db, 'restaurants').then((resp) => {
        //     response.send(resp.val());
        //     response.status(200);
        //   }).catch((error) => {
        //     response.send(error);
        //   }));
        //console.log( extend({}) );
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
};

export default router;
//module.exports = router;