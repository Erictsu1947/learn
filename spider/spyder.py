# -*- coding:utf-8 -*-
import requests
username = '曲哲eric'
password = '13914046564??'
payload ={'action':'login','username':username,'password':password,'ac_id':'3','type':'1','wbaredirect':'http://net.zju.edu.cn',
'mac':'undefined','user_ip':'','is_ldap':'1','local_auth':'1'}
url = "https://passport.baidu.com/v2/?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2F"
res = requests.post(url, data = payload)
#print response
print (res.text)