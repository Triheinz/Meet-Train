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
          'https://i.chzbgr.com/full/9151546112/hD5CC5989/el-fisiculturista-germanlifter-se-crea-un-perfil-falso-en-tinder',
        username: 'Sam',
        email: 'sam@hotmail.com',
        password: '12345',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat tellus in iaculis feugiat. Nullam sit amet massa metus. Duis in orci lectus. Praesent et erat nisl. Ut non eleifend odio. Fusce quis ultrices nisi. Suspendisse imperdiet lorem eu ligula finibus facilisis. Nullam sit amet orci viverra, iaculis ipsum sit amet, cursus nibh. Mauris semper, justo eget auctor vestibulum, sem erat bibendum turpis, at rhoncus mauris nisl vitae purus. Curabitur tempor mauris sit amet pulvinar faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi suscipit sed est ac finibus. Donec feugiat, felis eleifend congue posuere, ipsum libero fringilla ex, non blandit eros ipsum sit amet velit.',
        age: 20,
        city: 'Barcelona',
        sport: 'escalada',
        groups: 'escalada en barcelona',
      },
      {
        image: '/public/images/man.png',
        username: 'Adrian',
        email: 'ad@hotmail.com',
        password: '12345',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat tellus in iaculis feugiat. Nullam sit amet massa metus. Duis in orci lectus. Praesent et erat nisl. Ut non eleifend odio. Fusce quis ultrices nisi. Suspendisse imperdiet lorem eu ligula finibus facilisis. Nullam sit amet orci viverra, iaculis ipsum sit amet, cursus nibh. Mauris semper, justo eget auctor vestibulum, sem erat bibendum turpis, at rhoncus mauris nisl vitae purus. Curabitur tempor mauris sit amet pulvinar faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi suscipit sed est ac finibus. Donec feugiat, felis eleifend congue posuere, ipsum libero fringilla ex, non blandit eros ipsum sit amet velit.',
        age: 24,
        city: 'Barcelona',
        sport: 'surf',
        groups: 'surf en barcelona',
      },
      {
        image: '/public/images/man.png',
        username: 'Triana',
        email: 'tri@hotmail.com',
        password: '12345',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat tellus in iaculis feugiat. Nullam sit amet massa metus. Duis in orci lectus. Praesent et erat nisl. Ut non eleifend odio. Fusce quis ultrices nisi. Suspendisse imperdiet lorem eu ligula finibus facilisis. Nullam sit amet orci viverra, iaculis ipsum sit amet, cursus nibh. Mauris semper, justo eget auctor vestibulum, sem erat bibendum turpis, at rhoncus mauris nisl vitae purus. Curabitur tempor mauris sit amet pulvinar faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi suscipit sed est ac finibus. Donec feugiat, felis eleifend congue posuere, ipsum libero fringilla ex, non blandit eros ipsum sit amet velit.',
        age: 30,
        city: 'Barcelona',
        sport: 'correr',
        groups: 'correr en barcelona',
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
        image: '/public/images/climbing.jpeg',
        name: 'escalar en barcelona',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat tellus in iaculis feugiat. Nullam sit amet massa metus. Duis in orci lectus. Praesent et erat nisl. Ut non eleifend odio. Fusce quis ultrices nisi. Suspendisse imperdiet lorem eu ligula finibus facilisis. Nullam sit amet orci viverra, iaculis ipsum sit amet, cursus nibh. Mauris semper, justo eget auctor vestibulum, sem erat bibendum turpis, at rhoncus mauris nisl vitae purus. Curabitur tempor mauris sit amet pulvinar faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi suscipit sed est ac finibus. Donec feugiat, felis eleifend congue posuere, ipsum libero fringilla ex, non blandit eros ipsum sit amet velit.',
        announcement:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat tellus in iaculis feugiat. Nullam sit amet massa metus. Duis in orci lectus. Praesent et erat nisl. Ut non eleifend odio. Fusce quis ultrices nisi. Suspendisse imperdiet lorem eu ligula finibus facilisis. Nullam sit amet orci viverra, iaculis ipsum sit amet, cursus nibh. Mauris semper, justo eget auctor vestibulum, sem erat bibendum turpis, at rhoncus mauris nisl vitae purus. Curabitur tempor mauris sit amet pulvinar faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi suscipit sed est ac finibus. Donec feugiat, felis eleifend congue posuere, ipsum libero fringilla ex, non blandit eros ipsum sit amet velit.',
        city: 'Barcelona',
        sport: 'escalada',
        members: [ids[0]],
      },
    ];
    return Groups.create(groups);
  })
  .then((createdGroups) => {
    console.log(`Created ${createdGroups.length} groups`);
  })

  .catch((error) => console.error(error));

