# al_where_to_drop_the_package
  * Author: Zhou REN


Cette répertoire est l'implémentation du sujet Where To Drop the Package. Il contient trois projets:

# wheretodrop :
C'est un projet node.js généré par Yoeman. Il a le rôle de serveur. 
Il implémente la module de la génération de coordonnées et la module de gestion de communication avec le drone et le client.
Vous trouverez le code source de la première module dans le fichier /client/main.controller.js,ainsi le code source de la deuxième module dans le fichier /server/app.js


# wheretodrop_client:
C'est aussi un projet node.js. Il a le rôle de client.
Il implémente la module de la validation de zone de dépot. 
Vous trouverez le code source dans le fichier /client/main.controller.js


# wheretodrop_drone:
C'est un projet QtCreator en c++.
Les modules du traitement d'image et de la génération des coordonnées finales sont mockées. 
Par contre,il peux se connecter au serveur pour échanger les messages. Cette partie utilise la librairie socket.io en C++. 
