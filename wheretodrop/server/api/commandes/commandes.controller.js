'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([
    {
      name : "Zhou",
      adresse : '475 rue Evarist Galois,06410,BIOT'
    }, {
      name : 'Polytech M. Molines',
      adresse : '930 Route des Colles,06410,BIOT'
    }, {
      name : 'White House',
      adresse : '1600 Pennsylvania Ave NW, Washington, DC 20500, États-Unis'
    },  {
      name : 'M. Président Jinping XI',
      adresse : 'West Changan Street, Dongcheng District, Beijing 100006,China'
    },  {
      name : 'Polytech M. Collet',
      adresse : '930 Route des Colles,06410,BIOT'
    },{
      name : 'M. Hollande',
      adresse : '55 Rue du Faubourg Saint-Honoré,75008,Paris'
    },{
      name : 'SAP Labs France',
      adresse : '805 Avenue Maurice Donat,Sophia Antipolis'
    },{
      name : 'Carrefour Valbonne',
      adresse : '475 rue Evarist Galois,06410,BIOT'
    },{
      name : 'Polytech M. Collet',
      adresse : '930 Route des Colles,06410,BIOT'
    },{
      name : 'Notre Dame de Paris',
      adresse : '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris'
    }
  ]);
};
