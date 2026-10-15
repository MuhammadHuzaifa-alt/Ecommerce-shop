FROM python:3.14-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install dependencies separately for better build caching.
COPY requirements.txt .

RUN python -m pip install --upgrade pip \
    && pip install -r requirements.txt \
    && pip install gunicorn

# Copy application source.
COPY . .

# Create a non-root user.
RUN addgroup --system django \
    && adduser --system --ingroup django django \
    && chown -R django:django /app

USER django

EXPOSE 8000

# Replace config.wsgi with your actual Django project package.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "1", "backend.wsgi:application"]
