from django.contrib.auth.models import User
from rest_framework import viewsets
from app.api.serializers import UserSerializer
from app.api.serializers import ProductSerializer
from app.models import Product
from rest_framework.permissions import IsAuthenticated
from app.api.permissions import IsAuthenticatedOrProductOwner,IsAuthenticatedOrOwner
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.exceptions import NotFound, NotAuthenticated, ValidationError, PermissionDenied
from datetime import datetime
from rest_framework import status
# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrOwner]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter,filters.OrderingFilter,DjangoFilterBackend]
    search_fields = ['^username', '=email']
    filterset_fields = ['username', 'email']
    ordering = ['username']

    @action(detail=False,permission_classes=[IsAuthenticated])
    def profile(self, request):
        user = request.user
        serializer = self.get_serializer(user, many=False)
        return Response(serializer.data)

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrProductOwner]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        return self.request.user.products.filter(deleted_on=None)
    
    @action(detail=True,permission_classes=[IsAuthenticatedOrProductOwner])
    def delete(self, request, *args, **kwargs):
        product = self.get_object()
        product.deleted_on = datetime.now()
        product.save()
        return Response(status=status.HTTP_204_NO_CONTENT)