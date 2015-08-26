#coding:utf-8
import requests
from bs4 import BeautifulSoup
import re
DownPath = "D:\\python\code"
import urllib
head = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11'}
TimeOut = 5
PhotoName = 0
c = '.jpeg'
PWD="D:\\python\code\pic"
for x in range(1,4):
  site = "http://www.meizitu.com/a/qingchun_3_%d.html" %x
  Page = requests.session().get(site,headers=head,timeout=TimeOut)
  Coding =  (Page.encoding)
  Content = Page.content.decode(Coding).encode('utf-8')
  ContentSoup = BeautifulSoup(Content,'lxml')
  jpg = ContentSoup.find_all('img',{'class':'scrollLoading'})
  for photo in jpg:
    PhotoAdd = photo.get('data-original')
    PhotoName +=1
    Name =  (str(PhotoName)+c)
    r = requests.get(PhotoAdd,stream=True)
    with open(PWD+Name, 'wb') as fd:
        for chunk in r.iter_content():
                fd.write(chunk)
print ("You have down %d photos" %PhotoName)