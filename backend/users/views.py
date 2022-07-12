from users.models import Retailer
from users.serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics


class RegisterView(generics.CreateAPIView):
    queryset = Retailer.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
