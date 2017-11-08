# -*- coding: utf-8 -*-

from common.mymako import render_mako_context
from   django.http import HttpResponse
import urllib2
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
    order=request.GET.get('order')
    limit= request.GET.get('limit')
    offset=request.GET.get('offset')
    queryParams=request.GET.get('queryParams')
    params="?order="+order+"&limit="+limit+"&offset="+offset+"&queryParams="+queryParams
    param="?order=asc&limit=10&offset=0&queryParams=FD01%23abcdefgfedcba%2CFD07%23%2525E5%25259C%2525A8%2525E6%2525A0%2525A1"
    headers={
        #'Content-Type':'application/json',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
    }

   # 请求地址
    url="http://edw.tongji.edu.cn:5678/datacenter/fastQuery/findPageList"
    url=url+param

    request = urllib2.Request(url, headers=headers)
    response = urllib2.urlopen(request)
    result = response.read()

    return  HttpResponse(result)

def findBaseInfoBySno(request):
    sno=request.GET.get('sno')
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

    request = urllib2.Request(url, headers=headers)
    response = urllib2.urlopen(request)
    result = response.read()

    return  HttpResponse(result)

def getPhoto(request):
    sno=request.GET.get('sno')
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

    request = urllib2.Request(url, headers=headers)
    response = urllib2.urlopen(request)
    result = response.read()

    return  HttpResponse(result)

def getTest(request):
    order=request.GET.get('order')
    limit= request.GET.get('limit')
    offset=request.GET.get('offset')
    queryParams=request.GET.get('queryParams')
    params="?order="+order+"&limit="+limit+"&offset="+offset+"&queryParams="+queryParams

    return  HttpResponse(params)