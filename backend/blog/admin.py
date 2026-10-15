from django.contrib import admin

from .models import BlogCategory, Blog


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "category",
        "author",
        "date",
    )