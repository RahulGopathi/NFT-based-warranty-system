from django.urls import path, include
from rest_framework import routers
from .views import ProductViewSet, ItemViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'items', ItemViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
