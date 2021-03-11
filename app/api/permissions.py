from rest_framework import permissions
UNSAVE_METHODS = ('POST', 'PUT', 'PATCH')
SAFE_METHODS = permissions.SAFE_METHODS


class IsAuthenticatedOrProductOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False
    def has_object_permission(self, request, view, obj):
        return obj.owner.id == request.user.id

class IsAuthenticatedOrOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        else:
            if request.method == "POST":
                return True
        return False
    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id


