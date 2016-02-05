#include <QCoreApplication>
#include <sio_client.h>
#include <functional>
#include <mutex>
#include <cstdlib>
#include <iostream>
#include <opencv2/opencv.hpp>
#include <fstream>

using namespace std;
using namespace sio;
using namespace cv;

sio::client h;

//read image dans la repertoire et convertir en vector<char>
static std::vector<char> ReadAllBytes(char const* filename)
{
    ifstream ifs(filename, ios::binary|ios::ate);
    ifstream::pos_type pos = ifs.tellg();

    std::vector<char>  result(pos);

    ifs.seekg(0, ios::beg);
    ifs.read(&result[0], pos);

    return result;
}

void OnReceivePosition(sio::event & event){
    const message::ptr& data = event.get_message();
    if(data->get_flag() == message::flag_object)
       {
           std::string latitude = data->get_map()["latitude"]->get_string();
           std::string longitude = data->get_map()["longitude"]->get_string();
           int socketId = data->get_map()["socketId"]->get_int();

           std::cout <<"I am going to " <<"latitude:" <<latitude <<",    "<<"longitude:"<<longitude <<"for client "<<socketId<<std::endl;

           std::vector<char> imageData = ReadAllBytes("/home/user/al/wheretodrop_drone/img/drone-picture.jpg");

            h.socket()->emit("socketDroneId",int_message::create(socketId));
           h.socket()->emit("zoneChoosed", std::make_shared<std::string>(&imageData[0],imageData.size()));

           /*mock du résultat de traitement d'image pour envoyer la position de rectangle au serveur
            *la taille de zone est fix => longeur 100px, largeur 100px
            *Donc, pour indiquer la zone, il suffit envoyer la position du point en haut a gauche
            */

           h.socket()->emit("rectanglePosition", string_message::create("50:250"));
       }

}

void OnReceiveNewPosition(sio::event& event){
    const message::ptr& data = event.get_message();
    if(data->get_flag() == message::flag_object){
        int left = data->get_map()["left"]->get_int();
        int top = data->get_map()["top"]->get_int();
        cout<<"left position:"<<left<<"    "<<"top position:"<<top<<endl;
        // mock pour générer les coordonnées finales
        cout<<"I am going to the final position " <<"latitude:" <<"43.6175274" <<",    "<<"longitude:"<<"7.067699100000129"<< endl;
    }

}

int main(int argc, char *argv[])
{

    QCoreApplication a(argc, argv);

    h.connect("ws://localhost:9000");
    h.socket()->emit("droneConnected");
    h.socket()->on("sendPosition", &OnReceivePosition);
    h.socket()->on("newRectanglePosition",&OnReceiveNewPosition);



      /*cv::Mat image = cv::imread("/home/user/al/wheretodrop_drone/img/drone-picture.jpg",CV_LOAD_IMAGE_UNCHANGED);
      if(image.empty()){
       cout << "image load error" <<endl;
       a.exit();
      }
      std::vector<unsigned char> vec;
      vec.assign(image.data,image.data+image.cols*image.rows);*/
      //namedWindow("MyWindow",CV_WINDOW_AUTOSIZE);
     // cv::imshow("MyWindow",image);



    return a.exec();
}





