# -*- coding: utf-8 -*-

from common.mymako import render_mako_context
from   django.http import HttpResponse

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

def  huntgence(request):
    """
    智能搜索
    """
    return  render_mako_context(request, '/home_application/huntgence/index.html')

def secondMenu(request):
    """
   智能搜索
   """
    return  render_mako_context(request, '/home_application/huntgence/secondMenu.html')