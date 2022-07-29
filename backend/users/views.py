from users.models import Retailer
from users.serializers import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = Retailer.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
