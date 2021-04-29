require('dotenv').config();
const User = require('../models/User.model');
const Groups = require('../models/Groups.model');
const mongoose = require('mongoose'); //Paquete para conectarme a la base de datos
const DB_NAME = 'meet-train-app'; //nombre de la base de datos que se va a crear.
const bcrypt = require('bcryptjs');
const saltRounds = 10;

let userIds = [];


mongoose
    .connect(`mongodb://localhost/${DB_NAME}`) //Nos conectamos a la base de datos y nos devuelve una promesa.
    .then((db) => {
        // Aquí estamos 100% seguros que estamos conectados a la base de datos.
        console.log('Connected to database');
        return db.connection.dropDatabase();
    })
    .then(() => {
        const users = [
          {
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.menshealth.com%2Fes%2Ffitness%2Fa32742317%2Fescalada-ejercicios-gimnasio%2F&psig=AOvVaw23B_HEPhm56xj0cQ2ix4fJ&ust=1619788118294000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCQiI7Do_ACFQAAAAAdAAAAABAJ',
            username: 'Sam',
            email: 'sam@hotmail.com',
            password: '12345',
            description:
              'Me gusta escalar, normalmente entreno calistenia los días de semana y los findes de semana salgo a las afueras en busca de un rocodromo para practicar. Me gustaría quedar con más gente que lleve un estilo de vida similar.',
            age: 20,
            genero: 'hombre',
            city: 'Barcelona',
            sport: 'escalada',
            groups: 'Escalada en barcelona',
          },
          {
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.singlequiver.com%2Fenelpico%2Fsurf-barcelona%2F&psig=AOvVaw0d_GvUCkY_PUfyCo3-M-7s&ust=1619788268079000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjI9NnDo_ACFQAAAAAdAAAAABAD',
            username: 'Adrian',
            email: 'ad@hotmail.com',
            password: '12345',
            description:
              'No me pierdo una oportunidad de tomar una ola en la Barceloneta cada vez que se da la oportunidad, sin embargo me encantaría tener mas amistades para ir en busca de más olas!',
            age: 24,
            genero: 'hombre',
            city: 'Barcelona',
            sport: 'surf',
            groups: 'Surf en la city',
          },
          {
            image:
              '/https://www.google.com/url?sa=i&url=https%3A%2F%2Fsp.depositphotos.com%2Fstock-photos%2Fmujer-corriendo.html&psig=AOvVaw1SwtqO0f5w3vc5bhEDCs4K&ust=1619788580449000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJj4tu7Eo_ACFQAAAAAdAAAAABAD',
            username: 'Marie',
            email: 'marie@hotmail.com',
            password: '12345',
            description:
              'Soy de Francia, llevo 5 años viviendo en Barcelona y me gustaría conocer más gente que le guste correr largas distancias. Quien se apunta a ese reto?!',
            age: 30,
            genero: 'mujer',
            city: 'Barcelona',
            sport: 'correr',
            groups: 'Run Bcn Run',
          },
          {
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.retto.com%2Fmejores-cascos-mujer-ciclismo%2F&psig=AOvVaw0uoiehk3wRcMFHpT0fqlo2&ust=1619788524452000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiPxtXEo_ACFQAAAAAdAAAAABAD',
            username: 'Valentina',
            email: 'valen@hotmail.com',
            password: '12345',
            description:
              'Me gusta ir en bici rollo tranqui por las afueras, alguien se quiere sumar? Paradas de picinic incluidas!',
            age: 38,
            genero: 'mujer',
            city: 'Barcelona',
            sport: 'ciclismo',
            groups: 'Bike Chill barcelona',
          },
          {
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3APadel_Tennis_Arena_ISPO_2014.jpg&psig=AOvVaw2MO-rFIzqLKxOBhX4BGlK9&ust=1619788969409000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDr66jGo_ACFQAAAAAdAAAAABAD',
            username: 'Franco',
            email: 'fran@hotmail.com',
            password: '12345',
            description:
              'Quien se apunta a paddel tennis 2-3 veces a la semana en grupo? Nos hechamos unas cañas al terminar (chiste!)',
            age: 34,
            genero: 'hombre',
            city: 'Barcelona',
            sport: 'paddel',
            groups: 'Paddel Compis',
          },
          {
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsp.depositphotos.com%2F197907346%2Fstock-photo-young-woman-playing-soccer-ball.html&psig=AOvVaw0vz_sVCgo-43R9i8CRzWUx&ust=1619789039687000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODRic_Go_ACFQAAAAAdAAAAABAD',
            username: 'Cristina',
            email: 'cris@hotmail.com',
            password: '12345',
            description:
              'He llegado de Brasil hace unos meses y como viene verano, quiero encontrar compañer@s para ir a jugar futbol en la playa',
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
        const groups = [
          {
            admin: [ids[0]],
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.manasluadventures.com%2F10-beneficios-de-escalar-montanas%2F&psig=AOvVaw0a6ASNGg0KgEVp1JFNM32Y&ust=1619790476974000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCqifXLo_ACFQAAAAAdAAAAABAD',
            name: 'escalar en barcelona',
            email: 'sam@hotmail.com',
            description:
              'Este sábado quedamos en el rocodromo de Sant just a las 10am!! No olviden su snack, contáctame para mas detalles! ',
            announcement:
              'Este sábado quedamos en el rocodromo de Sant just a las 10am!! No olviden su snack, contáctame para mas detalles! ',
            city: 'Barcelona',
            sport: 'escalada',
            members: [ids[0]],
          },
          {
            admin: [ids[1]],
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.surfcantabria.com%2Fnoticias-enlace%2Fitem%2F3567-cronica-del-campeonato-regional-de-surf-2019.html&psig=AOvVaw2Z3vKyvUtrCjnof1gTLpZD&ust=1619790394748000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjc8M7Lo_ACFQAAAAAdAAAAABAD',
            name: 'Surf en la city',
            email: 'ad@hotmail.com',
            description:
              'Seamos los suficientes para irnos de ruta buscando las mejores olas, escríbeme para añadirte al grupo!',
            announcement:
              'Seamos los suficientes para irnos de ruta buscando las mejores olas, escríbeme para añadirte al grupo!',
            city: 'Barcelona',
            sport: 'surf',
            members: [ids[1]],
          },
          {
            admin: [ids[2]],
            image:
              'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.ashisports.es%2Fblog%2Fclub-de-corredores-en-barcelona%2F&psig=AOvVaw0vEL8NDhsM6_6Lv6FD9i97&ust=1619790308261000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCQtaLLo_ACFQAAAAAdAAAAABAD',
            name: 'Run Bcn Run',
            email: 'marie@hotmail.com',
            description:
              'Domingo arrancamos preparacion para los 10km, si eres principiante no te preocupes juntos llegaremos mas lejos! Ecríbeme:)',
            announcement:
              'Domingo arrancamos preparacion para los 10km, si eres principiante no te preocupes juntos llegaremos mas lejos! Ecríbeme:) ',
            city: 'Barcelona',
            sport: 'correr',
            members: [ids[2]],
          },
          {
            admin: [ids[3]],
            image:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.senalcolombia.tv%2Fdeportes%2Fcolectivos-mujeres-para-montar-bici&psig=AOvVaw0M6OefWlyjt6zO8xHwlsG4&ust=1619790261310000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMj3g5XLo_ACFQAAAAAdAAAAABAD',
            name: 'Bike Chill barcelona',
            email: 'valen@hotmail.com',
            description:
              'El 5 de Junio haremos una ruta chill + paradas de picnic, hemos empezado los entrenamientos escríbenos para incluirte!',
            announcement:
              'El 5 de Junio haremos una ruta chill + paradas de picnic, hemos empezado los entrenamientos escríbenos para incluirte!',
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

.catch((error) => console.error(error));
