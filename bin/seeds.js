require('dotenv').config();
const User = require('../models/User.model');
const Groups = require('../models/Groups.model');
const mongoose = require('mongoose'); //Paquete para conectarme a la base de datos
const DB_NAME = 'meet-train'; //nombre de la base de datos que se va a crear.
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let userIds = [];
mongoose
    .connect(process.env.MONGODB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }) //Nos conectamos a la base de datos y nos devuelve una promesa.
    .then((db) => {
        // Aquí estamos 100% seguros que estamos conectados a la base de datos.
        console.log('Connected to database');
        return db.connection.dropDatabase();
    })
    .then(() => {
        const users = [{
                image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shirtless-man-climbing-on-rock-royalty-free-image-1591106833.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
                username: 'Sam',
                email: 'sam@hotmail.com',
                password: '12345',
                description: 'Me gusta escalar, normalmente entreno calistenia los días de semana y los findes de semana salgo a las afueras en busca de un rocodromo para practicar. Me gustaría quedar con más gente que lleve un estilo de vida similar.',
                age: 20,
                genero: 'hombre',
                city: 'Barcelona',
                sport: 'escalada',
                groups: 'Escalada en barcelona',
            },
            {
                image: 'https://www.singlequiver.com/enelpico/wp-content/uploads/2020/08/surf-barceloneta.jpg',
                username: 'Adrian',
                email: 'ad@hotmail.com',
                password: '12345',
                description: 'No me pierdo una oportunidad de tomar una ola en la Barceloneta cada vez que se da la oportunidad, sin embargo me encantaría tener mas amistades para ir en busca de más olas!',
                age: 24,
                genero: 'hombre',
                city: 'Barcelona',
                sport: 'surf',
                groups: 'Surf en la city',
            },
            {
                image: 'https://www.bellezapura.com/wp-content/uploads/2020/05/mujer-corriendo.png',
                username: 'Marie',
                email: 'marie@hotmail.com',
                password: '12345',
                description: 'Soy de Francia, llevo 5 años viviendo en Barcelona y me gustaría conocer más gente que le guste correr largas distancias. Quien se apunta a ese reto?!',
                age: 30,
                genero: 'mujer',
                city: 'Barcelona',
                sport: 'correr',
                groups: 'Run Bcn Run',
            },
            {
                image: 'https://www.retto.com/images/blog/2018/03/mcm1.jpg',
                username: 'Valentina',
                email: 'valen@hotmail.com',
                password: '12345',
                description: 'Me gusta ir en bici rollo tranqui por las afueras, alguien se quiere sumar? Paradas de picinic incluidas!',
                age: 38,
                genero: 'mujer',
                city: 'Barcelona',
                sport: 'ciclismo',
                groups: 'Bike Chill barcelona',
            },
            {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Padel_Tennis_Arena_ISPO_2014.jpg/800px-Padel_Tennis_Arena_ISPO_2014.jpg',
                username: 'Franco',
                email: 'fran@hotmail.com',
                password: '12345',
                description: 'Quien se apunta a paddel tennis 2-3 veces a la semana en grupo? Nos hechamos unas cañas al terminar (chiste!)',
                age: 34,
                genero: 'hombre',
                city: 'Barcelona',
                sport: 'paddel',
                groups: 'Paddel Compis',
            },
            {
                image: 'https://pxb.cdn.elchubut.com.ar/chubut/032021/1614730568196.jpg',
                username: 'Cristina',
                email: 'cris@hotmail.com',
                password: '12345',
                description: 'He llegado de Brasil hace unos meses y como viene verano, quiero encontrar compañer@s para ir a jugar futbol en la playa',
                age: 27,
                genero: 'mujer',
                city: 'Barcelona',
                sport: 'futbol',
                groups: 'Fut Playa',
            },
        ];
        users.forEach((user) => {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(user.password, salt);
            user.password = hashedPassword;
        });
        return User.create(users);
    })
    .then((createdUsers) => {
        console.log(`Created ${createdUsers.length} users.`);
        createdUsers.forEach((user) => {
            userIds.push(user._id);
        });
        console.log(userIds);
        return userIds;
    })
    .then((ids) => {
        const groups = [{
                admin: [ids[0]],
                image: 'https://www.manasluadventures.com/wp-content/uploads/2019/09/Escalada-en-V%C3%ADas-Largas-1024x654.jpg',
                name: 'Escalar en barcelona',
                email: 'sam@hotmail.com',
                description: 'Este sábado quedamos en el rocodromo de Sant just a las 10am!! No olviden su snack, contáctame para mas detalles! ',
                announcement: 'Este sábado quedamos en el rocodromo de Sant just a las 10am!! No olviden su snack, contáctame para mas detalles! ',
                city: 'Barcelona',
                sport: 'escalada',
                members: [ids[0]],
            },
            {
                admin: [ids[1]],
                image: 'https://www.surfcantabria.com/images/2019/GRUPO_REGIONAL2019.jpg',
                name: 'Surf en la city',
                email: 'ad@hotmail.com',
                description: 'Seamos los suficientes para irnos de ruta buscando las mejores olas, escríbeme para añadirte al grupo!',
                announcement: 'Seamos los suficientes para irnos de ruta buscando las mejores olas, escríbeme para añadirte al grupo!',
                city: 'Barcelona',
                sport: 'surf',
                members: [ids[1]],
            },
            {
                admin: [ids[2]],
                image: 'http://www.ashisports.es/blog/wp-content/uploads/2017/04/newproject_2_original-88.jpg',
                name: 'Run Bcn Run',
                email: 'marie@hotmail.com',
                description: 'Domingo arrancamos preparacion para los 10km, si eres principiante no te preocupes juntos llegaremos mas lejos! Ecríbeme:)',
                announcement: 'Domingo arrancamos preparacion para los 10km, si eres principiante no te preocupes juntos llegaremos mas lejos! Ecríbeme:) ',
                city: 'Barcelona',
                sport: 'correr',
                members: [ids[2]],
            },
            {
                admin: [ids[3]],
                image: 'https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/field/image/ciclismo%20femenino%20ARTICULO.jpg',
                name: 'Bike Chill barcelona',
                email: 'valen@hotmail.com',
                description: 'El 5 de Junio haremos una ruta chill + paradas de picnic, hemos empezado los entrenamientos escríbenos para incluirte!',
                announcement: 'El 5 de Junio haremos una ruta chill + paradas de picnic, hemos empezado los entrenamientos escríbenos para incluirte!',
                city: 'Barcelona',
                sport: 'ciclismo',
                members: [ids[3]],
            },
        ];
        return Groups.create(groups);
    })
    .then((createdGroups) => {
        console.log(`Created ${createdGroups.length} groups`);
    })
    .catch((error) => console.error(error))