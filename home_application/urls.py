# -*- coding: utf-8 -*-

from django.conf.urls import patterns

urlpatterns = patterns(
    'home_application.views',
     (r'^$', 'index'),
     (r'^dev-guide/$', 'dev_guide'),
     (r'^contactus/$', 'contactus'),
     (r'^findPageList/$', 'findPageList'),
    (r'^findBaseInfoBySno/$', 'findBaseInfoBySno'),
    (r'^getPhoto/$', 'getPhoto'),
    (r'^getTest/$', 'getTest'),
)