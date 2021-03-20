from django.contrib import admin
from django.urls import path, include
from api import urls
from api.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('spotify/', include('spotify.urls')),
    path('create',index),
    path('join',index),
    path('room/<str:roomCode>',index),
    path('', index,name='home'),
]
