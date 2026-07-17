FROM python:3.11-slim

WORKDIR /app

# Install deps first so this layer is cached unless requirements change
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Reasonable defaults; override at `docker run` time with -e as needed.
ENV OPENAI_MODEL=gpt-4o-mini
ENV ALLOWED_ORIGINS=http://localhost:3000
ENV MAX_BODY_BYTES=200000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
