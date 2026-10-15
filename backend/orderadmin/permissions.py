from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):

    message = "Admin access required."

    def has_permission(self, request, view):

        user = request.user

        return (
            bool(user)
            and getattr(user, "is_authenticated", False)
            and getattr(user, "role", None) == "admin"
        )