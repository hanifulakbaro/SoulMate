FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

# Upgrade pip, setuptools, and wheel
RUN pip install --upgrade pip setuptools wheel

# Set working directory
WORKDIR /app

# Copy requirements and install with retries and no cache
COPY requirements.txt .

# Use CPU-only version of torch and add retry flags
RUN pip install --no-cache-dir --retries 5 --timeout 120 -r requirements.txt

# Copy application files
COPY . .

# Expose port
EXPOSE 8000

# Entrypoint
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
