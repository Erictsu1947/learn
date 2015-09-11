#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: anchen
# @Date:   2015-09-09 15:56:05
# @Last Modified by:   anchen
# @Last Modified time: 2015-09-10 10:27:21
#coding=UTF-8

__metaclass__ = type

import mysql.connector
import os
import time


class mysqlImg(object):
    """mysqlImg is a class for inserting image     
    """
    def __init__(self):
        
        self.__filelist=[]    
        self.__config = {
                  'user':'root',
                  'password':'123456',
                  'host':'localhost',
                  'database':'insight'}      
        

    def __dirwalk(self,dir,topdown=True):
        """traverse the documents of self.__dir and save in self.__filelist
        """
        sum=0
        self.__filelist.clear()
        
        for root,dirs,files in os.walk(dir,topdown):
            for name in files:
                sum+=1
                temp=os.path.join(root,name)
                self.__filelist.append(temp)
        print(sum)      
            
        
    def insertImg(self,imgpath,dbname=None):
        """insert images in mysql
        """
        if dbname != None:
            self.__config['database']=dbname
            
        self.__dirwalk(imgpath)
        
        sum=0
        tStart=time.time()
        
        self.__cnx=mysql.connector.connect(**self.__config)
        cur=self.__cnx.cursor()
        cur.execute("DROP TABLE IF EXISTS pyramid")
        cur.execute("CREATE TABLE pyramid(IdImg INT(11) PRIMARY KEY AUTO_INCREMENT,\
                    NameImg VARCHAR(30),\
                    DataImg LONGBLOB NOT NULL)")
                      
        try: 
            for fi in self.__filelist:
                sum+=1   
                print(sum)                    
                myimg = open(fi,'rb') 
                data=myimg.read()
            
                insertString='INSERT INTO pyramid(NameImg,DataImg) VALUES(%s,%s)'
                args=(fi,data)
                cur.execute(insertString,args)
                myimg.close()    
        finally:
            tEnd=time.time()
            print ("It cost %f sec" % (tEnd - tStart))
            self.__cnx.commit()
            self.__cnx.close()
        
    #get image by filename
    def getbyname(self,filename,savepath):
        """get img from mysql by NameImg
        """
        if len(filename) < 1:
            raise TypeError("filename must not be None")
        if len(savepath) < 1:
            raise TypeError("dir must be an string of directory")        

        self.__cnx=mysql.connector.connect(**self.__config)      
        cur=self.__cnx.cursor()
        
        try:
            selectString="SELECT DataImg FROM pyramid WHERE NameImg = %s"
            cur.execute(selectString,(filename,)) 
            
            data=cur.fetchone()[0]
            imgout=open(savepath,'wb')
            imgout.write(data)              
        finally:
            self.__cnx.close()
            imgout.close()