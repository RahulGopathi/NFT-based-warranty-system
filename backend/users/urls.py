from django.urls import path, include
from rest_framework import routers
from .views import RetailerViewset
router = routers.DefaultRouter()
router.register(r'retailers', RetailerViewset)

urlpatterns = [
    path('', include(router.urls))
]
