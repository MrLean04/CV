#include <iostream>
#include <string>
#include "opencv2/opencv.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/core/core.hpp"
#include "opencv2/imgcodecs.hpp"

using namespace cv;
using namespace std;
Mat src_gray;
int thresh =100;
RNG rng(12345);
string b = " ";

string ImageSele(){
    string a=" ";
    std:: cout << "Image";
    std:: cout << " ";
    std:: cout << "Red|Blue|Green|Yellow|Brown|Allinline|Allr|Allr2";
    std:: cout << " ";
    std:: cin >> a;
    
    return a;
}

void BoxC(int,void*){
    Mat cOutput;
    Canny(src_gray,cOutput,thresh,thresh*2);
    std::string stringf = " ";

    vector<vector<Point>> contours;
    findContours(cOutput,contours,RETR_TREE,CHAIN_APPROX_SIMPLE);

    vector<vector<Point>> contours_poly(contours.size());
    vector<Rect> boundRect(contours.size());
    vector<Point2f> centers(contours.size());
    vector<float> radius(contours.size());

    for(size_t i =0; i< contours.size(); i++){
        approxPolyDP(contours[i],contours_poly[i],3,true);
        boundRect[i] = boundingRect(contours_poly[i]);
        minEnclosingCircle(contours_poly[i],centers[i],radius[i]);
    }
    Mat drawing = Mat::zeros(cOutput.size(),CV_8UC3);
    int c =0;
    for(size_t i =0; i <contours.size();i++){
        Scalar color = Scalar(0,0,255);
        drawContours(drawing, contours_poly, (int)i,color);
        rectangle(drawing,boundRect[i].tl(), boundRect[i].br(),color,2);
        circle(drawing,centers[i],(int)radius[i],color,2);
        c++;
    }
     if(!b.compare("Brown")){
          stringf = std::to_string((centers.size()/2)-1);
     }
     else{stringf = std::to_string(centers.size()/2);}
    string s = "O Numero total de M&M's é:" + stringf;
    imshow(s,drawing);
}

string Op(){
    string a=" ";
    std::cout << " What is you Fav M&M?";
    std :: cout << " ";
    std:: cout << "red|blue|green|yellow|brown";
    std::cin >> a;
    
    return a;
}
int main()
{         
    Mat image;
    string p = " ";
    string i = " ";

    i = ImageSele();
    b=i;
    p = Op();
    
    if(!i.compare("Red")){
         image= cv ::imread("red.jpg",1);
    }
    
    if(!i.compare("Blue")){
         image= cv ::imread("blue.jpg",1);
    }

    if(!i.compare("Green")){
         image= cv ::imread("green.jpg",1);
    }

    if(!i.compare("Yellow")){
         image= cv ::imread("yellow.jpg",1);
    }

    if(!i.compare("Brown")){
         image= cv ::imread("brown.jpg",1);
    }

    if(!i.compare("Allinline")){
         image= cv ::imread("allinline.jpg",1);
    }

    if(!i.compare("Allr")){
         image= cv ::imread("allr.jpg",1);
    }
    if(!i.compare("Allr2")){
         image= cv ::imread("allr2.jpg",1);
    }


    if (!p.compare("red")){
    
    //red M&M
    Mat Output;
    inRange(image,Scalar(10,10,100),Scalar(100,100,255),Output);
    cvtColor(image,src_gray,COLOR_BGR2GRAY);
    blur(src_gray,src_gray,Size(3,3));
    const char* sw = "Red M&M";
    namedWindow(sw);
    imshow(sw,Output);
    const int max_tresh =255;
    BoxC(0,0);
    waitKey();
    }

    if( !p.compare("blue")){
    //blue M&M
    Mat Output2;
    inRange(image,Scalar(100,10,10),Scalar(255,100,100),Output2);
    cvtColor(image,src_gray,COLOR_BGR2GRAY);
    blur(src_gray,src_gray,Size(3,3));
    const char* sw = "Blue M&M";
    namedWindow(sw);
    imshow(sw,Output2);
    const int max_tresh =255;
    BoxC(0,0);
    waitKey();
    }

    if( !p.compare("yellow")){
    //yellow M&M
    Mat Output3;
    inRange(image,Scalar(10,100,100),Scalar(100,255,255),Output3);
    cvtColor(image,src_gray,COLOR_BGR2GRAY);
    blur(src_gray,src_gray,Size(3,3));
    const char* sw = "Yellow M&M";
    namedWindow(sw);
    imshow(sw,Output3);
    const int max_tresh =255;
    BoxC(0,0);
    waitKey();
    }

    if( !p.compare("green")){
    //green M&M
    Mat Output4;
    inRange(image,Scalar(10,100,10),Scalar(100,255,100),Output4);
    cvtColor(image,src_gray,COLOR_BGR2GRAY);
    blur(src_gray,src_gray,Size(3,3));
    const char* sw = "Green M&M";
    namedWindow(sw);
    imshow(sw,Output4);
    const int max_tresh =255;
    BoxC(0,0);
    waitKey();
    }

    if( !p.compare("brown")){
    //brown M&M
    Mat Output5;
    inRange(image,Scalar(0,10,25),Scalar(15,30,100),Output5);
    cvtColor(image,src_gray,COLOR_BGR2GRAY);
    blur(src_gray,src_gray,Size(3,3));
    const char* sw = "Brown M&M";
    namedWindow(sw);
    imshow(sw,Output5);
    const int max_tresh =255;
    BoxC(0,0);
    waitKey();
    }
     
     


    return 0;
}