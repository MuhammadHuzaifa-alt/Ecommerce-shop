"""
Django settings for backend project.

Django version: 6.0.6
"""

import os

from pathlib import Path
from datetime import timedelta


# ==========================================================
# BASE
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ==========================================================
# ENVIRONMENT
# ==========================================================

DEBUG = (
    os.environ.get(
        "DJANGO_DEBUG",
        "True",
    ).lower()
    == "true"
)


# ==========================================================
# SECURITY
# ==========================================================

SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
    "django-insecure-development-only-key",
)


# ==========================================================
# ALLOWED HOSTS
# ==========================================================

if DEBUG:
    ALLOWED_HOSTS = [
        "localhost",
        "127.0.0.1",
        "backend",
    ]
else:
    ALLOWED_HOSTS = [
        host.strip()
        for host in os.environ.get(
            "DJANGO_ALLOWED_HOSTS",
            "",
        ).split(",")
        if host.strip()
    ]


# ==========================================================
# APPLICATIONS
# ==========================================================

INSTALLED_APPS = [

    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",

    # Third-party
    "corsheaders",
    "rest_framework",

    # Project apps
    "register",
    "adminproduct",
    "product",
    "blog",
    "Orders",
    "orderadmin",
    "authadmin",
]


# ==========================================================
# MIDDLEWARE
# ==========================================================

MIDDLEWARE = [

    # CORS must be before CommonMiddleware
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ==========================================================
# URL / WSGI
# ==========================================================

ROOT_URLCONF = "backend.urls"

WSGI_APPLICATION = "backend.wsgi.application"


# ==========================================================
# TEMPLATES
# ==========================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ==========================================================
# DATABASE
# ==========================================================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_DB", "ecommerce_db"),
        "USER": os.getenv("POSTGRES_USER", "ecommerce_user"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD", ""),
        "HOST": os.getenv("POSTGRES_HOST", "db"),
        "PORT": os.getenv("POSTGRES_PORT", "5432"),
    }
}


# ==========================================================
# PASSWORD VALIDATION
# ==========================================================

AUTH_PASSWORD_VALIDATORS =  [
  {
        "NAME":
        "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME":
        "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# ==========================================================
# INTERNATIONALIZATION
# ==========================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# ==========================================================
# STATIC FILES
# ==========================================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# ==========================================================
# MEDIA FILES
# ==========================================================

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"

# Avoid chmod operations on Windows-mounted filesystems in local WSL development.
FILE_UPLOAD_PERMISSIONS = None
FILE_UPLOAD_DIRECTORY_PERMISSIONS = None

# ==========================================================
# CUSTOM USER MODEL
# ==========================================================

AUTH_USER_MODEL = "register.Register"


# ==========================================================
# DJANGO REST FRAMEWORK
# ==========================================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}


# ==========================================================
# JWT
# ==========================================================

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(
        minutes=30
    ),

    "REFRESH_TOKEN_LIFETIME": timedelta(
        days=7
    ),

    "ROTATE_REFRESH_TOKENS": True,

    "BLACKLIST_AFTER_ROTATION": True,

    "AUTH_HEADER_TYPES": (
        "Bearer",
    ),
}


# ==========================================================
# CORS
# ==========================================================

CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "DJANGO_CORS_ALLOWED_ORIGINS",
        "http://localhost:1573,http://localhost:1574,http://127.0.0.1:1573,http://127.0.0.1:1574",
    ).split(",")
    if origin.strip()
]

CORS_ALLOW_CREDENTIALS = True

# ==========================================================
# CSRF
# ==========================================================

CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "DJANGO_CSRF_TRUSTED_ORIGINS",
        "http://localhost:1573,http://localhost:1574,http://127.0.0.1:1573,http://127.0.0.1:1574",
    ).split(",")
    if origin.strip()
]



# ==========================================================
# HTTPS SECURITY
# ==========================================================

SECURE_SSL_REDIRECT = not DEBUG

SESSION_COOKIE_SECURE = not DEBUG

CSRF_COOKIE_SECURE = not DEBUG


# ==========================================================
# HSTS
# ==========================================================

SECURE_HSTS_SECONDS = (
    31536000
    if not DEBUG
    else 0
)

SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG

SECURE_HSTS_PRELOAD = not DEBUG


# ==========================================================
# ADDITIONAL SECURITY
# ==========================================================

SECURE_CONTENT_TYPE_NOSNIFF = True

SECURE_REFERRER_POLICY = "same-origin"

X_FRAME_OPTIONS = "DENY"
