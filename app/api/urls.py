from rest_framework import routers, viewsets
from rest_framework_simplejwt import views as jwt_views
from django.urls import path, include
from app.api.views import UserViewSet
from app.api.views import ProductViewSet
# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'products', ProductViewSet)

endpoints = [
    path('api/', include(router.urls)),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]