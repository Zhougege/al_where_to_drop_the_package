#-------------------------------------------------
#
# Project created by QtCreator 2016-01-27T22:31:48
#
#-------------------------------------------------

QT       += core

QT       -= gui

TARGET = wheretodrop_drone
CONFIG   += console
CONFIG   -= app_bundle
CONFIG+=no_keywords
CONFIG+=c++11

TEMPLATE = app


SOURCES += main.cpp


INCLUDEPATH += $$PWD/../../socketio_cpp/build/include
INCLUDEPATH += $$PWD/../../src/OpenCV-2.4.4/include

DEPENDPATH += $$PWD/../../socketio_cpp/build/lib

LIBS += -L/usr/local/lib -lopencv_core -lopencv_imgproc -lopencv_highgui

CONFIG(release, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Release/ -lsioclient
else:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Debug/ -lsioclient

CONFIG(release, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Release/ -lboost_random
else:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Debug/ -lboost_random

CONFIG(release, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Release/ -lboost_system
else:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Debug/ -lboost_system

CONFIG(release, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Release/ -lboost_date_time
else:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../socketio_cpp/build/lib/Debug/ -lboost_date_time

OTHER_FILES += \
    img/drone-picture.jpg
