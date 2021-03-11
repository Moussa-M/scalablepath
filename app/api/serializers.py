from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import Product

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','url', 'username', 'email', 'is_staff']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('owner',)

    def create(self, validated_data):
        product = Product.objects.create(owner=self.context['request'].user,**validated_data)
        return product

