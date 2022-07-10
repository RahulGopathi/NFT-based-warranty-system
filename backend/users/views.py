from rest_framework import viewsets
from .models import Retailer
from .serializers import RetailerSerializer
# Create your views here.


class RetailerViewset(viewsets.ModelViewSet):
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer
