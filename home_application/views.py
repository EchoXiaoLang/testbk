# -*- coding: utf-8 -*-

from common.mymako import render_mako_context
from   django.http import HttpResponse
import urllib
def home(request):
    """
    首页
    """
    return render_mako_context(request, '/home_application/home.html')


def dev_guide(request):
    """
    开发指引
    """
    return render_mako_context(request, '/home_application/dev_guide.html')


def contactus(request):
    """
    联系我们
    """
    return render_mako_context(request, '/home_application/contact.html')

def  index(request):

  return  render_mako_context(request, '/home_application/huntgence/index2.html')

def findPageList(request):
    order = request.GET.get('order','ORDER')
    limit = request.GET.get('limit','LIMIT')
    offset = request.GET.get('offset','OFFSET')
    order = request.GET.get('order','ORDER')
    queryParams = request.POST.get('queryParams','QUERYPARAMS')
    param="?order="+order+"&sort="+limit+"&limit="+offset+"&offset="+order+"&queryParams="+queryParams
    headers={
        #'Content-Type':'application/json',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
    }

   # 请求地址
    url="http://edw.tongji.edu.cn:5678/datacenter/fastQuery/findPageList"
    url=url+param
    print url

    request=urllib.request.Request(url,headers=headers)
    response=urllib.request.urlopen(request)
    result=response.read()

    return  result

def findBaseInfoBySno(request):
    sno = request.GET.get('sno','SNO')
    param="?sno="+sno
    headers={
        #'Content-Type':'application/json',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
    }

    # 请求地址
    url="http://edw.tongji.edu.cn:5678/datacenter/fastQuery/findBaseInfoBySno"
    url=url+param
    print url

    request=urllib.request.Request(url,headers=headers)
    response=urllib.request.urlopen(request)
    result=response.read()

    return  result

def getPhoto(request):
    sno = request.GET.get('sno','SNO')
    param="?sno="+sno
    headers={
        #'Content-Type':'application/json',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
    }

    # 请求地址
    url="http://edw.tongji.edu.cn:5678/datacenter/fastQuery/getPhoto"
    url=url+param
    print url

    request=urllib.request.Request(url,headers=headers)
    response=urllib.request.urlopen(request)
    result=response.read()

    return result