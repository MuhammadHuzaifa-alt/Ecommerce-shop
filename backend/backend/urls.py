
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path("admin/", admin.site.urls),

    # Existing registration and authentication routes
    path("api/auth/", include("register.urls")),

    # Compatibility route expected by the tests
    path("api/", include("register.urls")),

    path("api/admin/", include("adminproduct.urls")),
    path("api/products/", include("adminproduct.client_urls")),
    path("api/", include("adminproduct.urls")),
    path("api/", include("blog.urls")),
    path("api/orders/", include("Orders.urls")),
    path("api/admin/orders/", include("orderadmin.urls")),

    # Existing admin routes
    path("api/admin/", include("authadmin.urls")),

    # Admin authentication route expected by the tests
    path("api/admin/auth/", include("authadmin.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )